import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";

export const getBookings = asyncHandler(async (req: Request, res: Response) => {
  const hotels = await Hotel.find({
    bookings: { $elemMatch: { userId: req.userId } },
  });

  const results = hotels.map((hotel) => {
    const userBookings = hotel.bookings.filter(
      (booking) => booking.userId === req.userId
    );

    const hotelWithUserBookings: HotelType = {
      ...hotel.toObject(),
      bookings: userBookings,
    };

    return hotelWithUserBookings;
  });

  res.status(200).send(results);
});
