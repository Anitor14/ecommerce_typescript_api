import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { userService } from "./service";
import { MessageResponse } from "./enums";
import { IResponseSchema } from "./interface";

const { getAllUsers } = userService;

class UserController {
  public async getAllUsers(req: Request, res: Response) {
    const users = await getAllUsers();
    return res.status(StatusCodes.OK).json(<IResponseSchema>{
      message: MessageResponse.Success,
      description: "These are all the users",
      data: users,
    });
  }
  public async getSingleUser(req: Request, res: Response) {
    return res.status(StatusCodes.OK).json(<IResponseSchema>{
      message: MessageResponse.Success,
      description: "Registration Successful",
      data: null,
    });
  }

  public async showCurrentUser(req: Request, res: Response) {
    return res.status(StatusCodes.OK).json(<IResponseSchema>{
      message: MessageResponse.Success,
      description: "This is for showCurrentUser",
      data: null,
    });
  }
}

export const userController = new UserController();
