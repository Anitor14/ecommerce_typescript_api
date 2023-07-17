import { Request, Response, NextFunction } from "express";
import { isTokenValid } from "../utils/jwt";
import { StatusCodes } from "http-status-codes";
import { IResponseSchema } from "../user/interface";
import { MessageResponse } from "../user/enums";
import { UserPayload } from "../auth/interface";

interface UserRequest extends Request {
  user: UserPayload;
}

export const authenticateUser = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  // We check for signed cookies from the request.
  const token = req.signedCookies.token;
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json(<IResponseSchema>{
      message: MessageResponse.Error,
      description: "Unauthorized access to this route.",
      data: null,
    });
  }
  try {
    const payload = isTokenValid({ token });
    // We can get the name, userId, and role from the payload obtained from the result of isTokenValid.
    const { name, userId, role } = payload as UserPayload;
    req.user = { name, userId, role };
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json(<IResponseSchema>{
      message: MessageResponse.Error,
      description: "Unauthorized access to this route.",
      data: null,
    });
  }
  // Add a final return statement to handle the normal flow
  return undefined;
};
