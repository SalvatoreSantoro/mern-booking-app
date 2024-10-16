import express from "express";
import {
  searchHotels,
  getOneHotelById,
  createPaymentIntent,
  createBooking,
} from "../controllers/hotelsController";
import { param } from "express-validator";
import verifyToken from "../middlewares/auth";

const router = express.Router();

router.get("/search", searchHotels);

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  getOneHotelById
);

router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  createPaymentIntent
);

router.post("/:hotelId/bookings", verifyToken, createBooking);

export default router;
