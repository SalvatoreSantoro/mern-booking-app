import User from "../models/user";
import set_cookie_jwt from "../utils/jwt";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ResponseError } from "../middlewares/errorHandler";
import asyncHandler from "../utils/asyncHandler";

const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new ResponseError(errors.array(), 400);
    let user = await User.findOne({
      email: req.body.email,
    });
    if (user) throw new ResponseError("User already exists", 400);

    user = new User(req.body);
    await user.save();

    set_cookie_jwt(res, user);
    res.status(200).json({ userId: user._id });
  }
);

export default register;
