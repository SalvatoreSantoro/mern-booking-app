import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel";
import { validationResult } from "express-validator";
import { ResponseError } from "../middlewares/errorHandler";
import { HotelType } from "../shared/types";

export const createHotel = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req.body);
  console.log(req.body)
  if (!errors.isEmpty()) throw new ResponseError(errors.array(), 400);
  const imageFiles = req.files as Express.Multer.File[];
  const newHotel: HotelType = req.body;
  
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });
  
  const imageUrls = await Promise.all(uploadPromises);
  newHotel.imageUrls = imageUrls;
  newHotel.lastUpdated = new Date();
  newHotel.userId = req.userId;

  const hotel = new Hotel(newHotel);
  await hotel.save();
  res.status(201).send(hotel);
});

export const getHotels = asyncHandler(async (req: Request, res: Response) => {
  const hotels = await Hotel.find({ userId: req.userId });
  res.json(hotels);
});
