import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { userService } from "./service";
import { MessageResponse } from "./enums";
import { IResponseSchema } from "./interface";
import { UserPayload } from "../auth/interface";
import { createTokenUser } from "../utils/createTokenUser";

const { getAllUsers, getSingleUser, updateUser, updateUserPassword } =
  userService;

type CustomRequest = Request & {
  user?: UserPayload;
};

class UserController {
  public async getAllUsers(req: CustomRequest, res: Response) {
    const users = await getAllUsers();
    return res.status(StatusCodes.OK).json(<IResponseSchema>{
      message: MessageResponse.Success,
      description: "Get all users.",
      data: users,
    });
  }

  public async getSingleUser(req: Request, res: Response) {
    const {
      params: { id: userId },
    } = req;

    const singleUser = await getSingleUser(userId);
    return res.status(StatusCodes.OK).json(<IResponseSchema>{
      message: MessageResponse.Success,
      description: `successfully gotten ${singleUser?.name} data `,
      data: singleUser,
    });
  }

  public async showCurrentUser(req: CustomRequest, res: Response) {
    return res.status(StatusCodes.OK).json(<IResponseSchema>{
      message: MessageResponse.Success,
      description: "This is for showCurrentUser",
      data: req.user,
    });
  }

  public async updateUser(req: CustomRequest, res: Response) {
    const { email, name } = req.body;

    const id: any = req.user?.userId;
    const updatedUser = await updateUser(id, name, email);

    if (updatedUser) {
      const tokenUser = createTokenUser(updatedUser);
      return res.status(StatusCodes.OK).json(<IResponseSchema>{
        message: MessageResponse.Success,
        description: "User Updated",
        data: tokenUser,
      });
    }
    const tokenUser = createTokenUser(updatedUser);
    return res.status(StatusCodes.BAD_REQUEST).json(<IResponseSchema>{
      message: MessageResponse.Error,
      description: "Error while updating user",
      data: tokenUser,
    });
  }

  public async updateUserPassword(req: CustomRequest, res: Response) {
    const { oldPassword, newPassword } = req.body;

    console.log(`OldPassword: ${oldPassword} , newPassword: ${newPassword}`);

    const id: any = req.user?.userId;

    const updatedPasswordUser = await updateUserPassword(
      oldPassword,
      newPassword,
      id
    );

    if (!updatedPasswordUser) {
      return res.status(StatusCodes.BAD_REQUEST).json(<IResponseSchema>{
        message: MessageResponse.Success,
        description: "Please input a valid password",
        data: [],
      });
    }
    return res.status(StatusCodes.OK).json(<IResponseSchema>{
      message: MessageResponse.Success,
      description: "password has been updated successfully",
      data: [],
    });
  }
}

export const userController = new UserController();
