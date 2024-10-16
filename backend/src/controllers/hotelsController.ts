import Hotel from "../models/hotel";
import { BookingType, HotelSearchResponse } from "../shared/types";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";
import constructSearchQuery from "../utils/constructSearchQuery";
import { validationResult } from "express-validator";
import { ResponseError } from "../middlewares/errorHandler";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

export const searchHotels = asyncHandler(
  async (req: Request, res: Response) => {
    const query = constructSearchQuery(req.query);
    let sortOptions = {};
    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;
    }
    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;
    const hotels = await Hotel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);
    const total = await Hotel.countDocuments(query);
    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  }
);

export const getOneHotelById = asyncHandler(
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      throw new ResponseError(errors.array(), 400);
    }
    const id = req.params.id.toString();
    const hotel = await Hotel.findOne({ _id: id });
    res.status(200).json(hotel);
  }
);

export const createPaymentIntent = asyncHandler(
  async (req: Request, res: Response) => {
    const { numberOfNights } = req.body;
    const hotelId = req.params.hotelId;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      throw new ResponseError("Hotel not found", 400);
    }

    const totalCost = hotel.pricePerNight * numberOfNights;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost,
      currency: "eur",
      metadata: {
        hotelId,
        userId: req.userId,
      },
    });

    if (!paymentIntent.client_secret) {
      throw new ResponseError("Error creating payment intent", 500);
    }

    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalCost,
    };

    res.send(response);
  }
);

export const createBooking = asyncHandler(
  async (req: Request, res: Response) => {
    const paymentIntentId = req.body.paymentIntentId;
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId as string
    );
    if (!paymentIntent) {
      throw new ResponseError("payment intent not found", 400);
    }
    if (
      paymentIntent.metadata.hotelId !== req.params.hotelId ||
      paymentIntent.metadata.userId !== req.userId
    ) {
      throw new ResponseError("payment intent mismatch", 400);
    }

    if (paymentIntent.status !== "succeeded") {
      throw new ResponseError(
        `payment intent not succeeded. Status: ${paymentIntent.status}`,
        400
      );
    }

    const newBooking: BookingType = {
      ...req.body,
      userId: req.userId,
    };

    const hotel = await Hotel.findOneAndUpdate(
      { _id: req.params.hotelId },
      {
        $push: { bookings: newBooking },
      }
    );

    if (!hotel) {
      throw new ResponseError("hotel not found", 400);
    }
    await hotel.save();
    res.status(200).send();
  }
);
