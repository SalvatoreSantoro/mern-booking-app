import User from "../models/user";
import set_cookie_jwt from "../utils/jwt";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ResponseError } from "../middlewares/errorHandler";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const res_error = new ResponseError(errors.array(), 400);
    return next(res_error);
  }
  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      const res_error = new ResponseError("User already exists", 400);
      return next(res_error);
    }
    user = new User(req.body);
    await user.save();

    set_cookie_jwt(res, user);
    res.status(200).json({ userId: user._id });
  } catch (error) {
    next(error);
  }
};

export default register;
