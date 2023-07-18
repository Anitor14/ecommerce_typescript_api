import { Request, Response, NextFunction } from "express";
import { isTokenValid } from "../utils/jwt";
import { StatusCodes } from "http-status-codes";
import { IResponseSchema } from "../user/interface";
import { MessageResponse } from "../user/enums";
import { UserPayload } from "../auth/interface";

type CustomRequest = Request & {
  user?: UserPayload;
};

export const authenticateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  // We check for signed cookies from the request.
  const token = req.signedCookies.token;
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json(<IResponseSchema>{
      message: MessageResponse.Error,
      description: "Unauthorized access to this route.",
      data: [],
    });
  }
  try {
    const payload = isTokenValid({ token });
    // We can get the name, userId, and role from the payload obtained from the result of isTokenValid.
    const { name, userId, role } = payload;
    req.user = { name, userId, role };
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json(<IResponseSchema>{
      message: MessageResponse.Error,
      description: "Unauthorized access to this route.",
      data: [],
    });
  }
  // Add a final return statement to handle the normal flow
  return undefined;
};

export const authorizePermissions = (...roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.user?.role && !roles.includes(req.user.role)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(<IResponseSchema>{
        message: MessageResponse.Error,
        description: "Unauthorized access to this route.",
        data: [],
      });
    }
    next();
    return undefined;
  };
};
