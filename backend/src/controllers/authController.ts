import User from "../models/user";
import bcrypt from "bcryptjs";
import set_cookie_jwt from "../utils/jwt";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ResponseError } from "../middlewares/errorHandler";

const login = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const res_error = new ResponseError(errors.array(), 400);
    return next(res_error);
  }
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const res_error = new ResponseError("Invalid Credentials", 400);
      return next(res_error);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const res_error = new ResponseError("Invalid Credentials", 400);
      return next(res_error);
    }

    set_cookie_jwt(res, user);

    res.status(200).json({ userId: user._id });
  } catch (error) {
    next(error);
  }
};

export default login;
