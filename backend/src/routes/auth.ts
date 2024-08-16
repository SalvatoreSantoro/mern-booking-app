import { Request, Response } from "express";
import express from "express";
import { check } from "express-validator";
import {login} from "../controllers/authController";
import verifyToken from "../middlewares/auth";
import {validateToken} from "../controllers/authController"

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  login
);

router.get("/validate-token", verifyToken, validateToken);

export default router;
