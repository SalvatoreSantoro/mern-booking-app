import express from "express";
import { check } from "express-validator";
import {register , getUser} from "../controllers/userController";
import verifyToken from "../middlewares/auth";
const router = express.Router();

router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isString(),
    check("password", "Passwordwith 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  register
);

router.get("/me", verifyToken, getUser);

export default router;
