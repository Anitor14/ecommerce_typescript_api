import { Request, Response } from "express";
import { MessageResponse, RoleFormat } from "../user/enums";
import { IResponseSchema, IUser } from "../user/interface";
import { StatusCodes } from "http-status-codes";
import { userService } from "../user/service";
import { createTokenUser } from "../utils/createTokenUser";
import { attachCookiesToResponse } from "../utils/jwt";

const { readUser, isFirstUser, createUser } = userService;

class AuthController {
  public async register(req: Request, res: Response) {
    const { email, password, name }: IUser = req.body;

    // check if the user already exists.
    const emailAlreadyExists = await readUser(email);

    if (emailAlreadyExists) {
      return res.status(StatusCodes.BAD_REQUEST).json(<IResponseSchema>{
        message: MessageResponse.Error,
        description: "Account already exists",
        data: null,
      });
    }

    // check if the user is the first person
    const isFirstAccount = await isFirstUser();
    const role = isFirstAccount ? RoleFormat.ADMIN : RoleFormat.USER;

    // creating the user.
    const user = await createUser({ email, password, role, name });
    console.log(user);
    //creating a token from the user.
    const tokenUser = createTokenUser(user);

    // attaching the cookies to response.
    attachCookiesToResponse(res, tokenUser);

    return res.status(StatusCodes.OK).json(<IResponseSchema>{
      message: MessageResponse.Success,
      description: "This is for registration",
      data: tokenUser,
    });
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
