import express from "express";
import verifyToken from "../middlewares/auth";
import { getBookings } from "../controllers/my-bookingsController";

const router = express.Router();

router.get("/", verifyToken, getBookings)


export default router;