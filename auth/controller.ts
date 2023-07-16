import { Request, Response } from "express";
import { MessageResponse } from "../user/enums";
// import { Iuser } from "../user/interface";
import { IResponseSchema } from "../user/interface";
import { StatusCodes } from "http-status-codes";

class AuthController {
  public async register(req: Request, res: Response) {
    const response: IResponseSchema = {
      message: MessageResponse.Success,
      description: "This is for registration",
      data: null,
    };
    return res.status(StatusCodes.OK).json({ response });
  }
  public async login(req: Request, res: Response) {
    const response: IResponseSchema = {
      message: MessageResponse.Success,
      description: "This is for login",
      data: null,
    };
    return res.status(StatusCodes.OK).json({ response });
  }
  public async logout(req: Request, res: Response) {
    const response: IResponseSchema = {
      message: MessageResponse.Success,
      description: "This is for logout",
      data: null,
    };
    return res.status(StatusCodes.OK).json({ response });
  }
}

export const authController = new AuthController();
