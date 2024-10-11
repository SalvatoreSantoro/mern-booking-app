import Hotel from "../models/hotel";
import { HotelSearchResponse } from "../shared/types";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";

export const searchHotel = asyncHandler(async (req: Request, res: Response) => {
  const pageSize = 5;
  const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");
  const skip = (pageNumber - 1) * pageSize;
  const hotels = await Hotel.find().skip(skip).limit(pageSize);
  const total = await Hotel.countDocuments();
  const response: HotelSearchResponse = {
    data: hotels,
    pagination: {
      total,
      page: pageNumber,
      pages: Math.ceil(total / pageSize),
    },
  };

  res.json(response);
});
