import express from "express";
import { check } from "express-validator";
import register from "../controllers/userController";
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

export default router;
