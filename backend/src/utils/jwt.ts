import jwt from "jsonwebtoken";
import { Response } from "express";
import { UserType } from "../shared/types";


const set_cookie_jwt = (res: Response, user: UserType) => {
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: "1d" }
  );

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 86400000,
  });
};

export default set_cookie_jwt;
