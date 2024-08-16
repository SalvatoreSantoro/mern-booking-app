import User from "../models/user";
import bcrypt from "bcryptjs";
import set_cookie_jwt from "../utils/jwt";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ResponseError } from "../middlewares/errorHandler";
import asyncHandler from "../utils/asyncHandler";

const login = asyncHandler(
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new ResponseError(errors.array(), 400);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new ResponseError("Invalid Credentials", 400);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ResponseError("Invalid Credentials", 400);

    set_cookie_jwt(res, user);

    res.status(200).json({ userId: user._id });
  }
);

export default login;
