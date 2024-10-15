import express from "express";
import { searchHotels, getOneHotelById } from "../controllers/hotelsController";
import { param } from "express-validator";

const router = express.Router();

router.get("/search", searchHotels);

router.get("/:id", [param("id").notEmpty().withMessage("Hotel ID is required")], getOneHotelById);

export default router;
