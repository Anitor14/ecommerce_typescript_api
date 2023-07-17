import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { UserPayload } from "../auth/interface";
import { Response } from "express";

export const createJWT = ({ payload }: { payload: UserPayload }): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

export const isTokenValid = ({ token }: { token: string }): JwtPayload => {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  return decodedToken;
};

export const attachCookiesToResponse = (
  res: Response,
  user: UserPayload
): void => {
  const token = createJWT({ payload: user });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};
