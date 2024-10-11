import express from "express";
import { searchHotel } from "../controllers/hotelsController";

const router = express.Router();


router.get("/search", searchHotel)


export default router;