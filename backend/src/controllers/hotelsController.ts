import Hotel from "../models/hotel";
import { HotelSearchResponse } from "../shared/types";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";
import constructSearchQuery from "../utils/constructSearchQuery";
import { validationResult } from "express-validator";
import { ResponseError } from "../middlewares/errorHandler";

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
    console.log(errors)
    if (!errors.isEmpty()){
       throw new ResponseError(errors.array(), 400);
    }
    const id = req.params.id.toString();
    const hotel = await Hotel.findOne({ _id: id });
    res.status(200).json(hotel);
  }
);
