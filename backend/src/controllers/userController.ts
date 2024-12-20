import User from "../models/user";
import set_cookie_jwt from "../utils/jwt";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ResponseError } from "../middlewares/errorHandler";
import asyncHandler from "../utils/asyncHandler";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ResponseError(errors.array(), 400);
  let user = await User.findOne({
    email: req.body.email,
  });
  if (user) throw new ResponseError("User already exists", 400);

  user = new User(req.body);
  await user.save();

  set_cookie_jwt(res, user);
  //res.status(200).json({ userId: user._id });
  res.status(200).send({ message: "Registration successfull." });
});


export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.userId;

  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new ResponseError("User not found", 400);
  }
  res.json(user);
});
