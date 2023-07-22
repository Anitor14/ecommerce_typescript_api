import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { userService } from "./service";
import { MessageResponse } from "./enums";
import { IResponseSchema } from "./interface";
import { UserPayload } from "../auth/interface";
import { createTokenUser } from "../utils/createTokenUser";
import { User } from "./entity";

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

    const singleUser: User | null = await getSingleUser(userId);

    if (!singleUser) {
      return res.status(StatusCodes.NOT_FOUND).json(<IResponseSchema>{
        message: MessageResponse.Error,
        description: "There is no user with this id.",
        data: [],
      });
    }

    //removing the password from the single user.
    const { password, ...userWithoutPassword } = singleUser;

    return res.status(StatusCodes.OK).json(<IResponseSchema>{
      message: MessageResponse.Success,
      description: `successfully gotten ${singleUser?.name} data `,
      data: userWithoutPassword,
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

    const userId: any = req.user?.userId;

    const user: User | null = await getSingleUser(userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json(<IResponseSchema>{
        message: MessageResponse.Error,
        description: "There is no user with this id.",
        data: [],
      });
    }
    const updatedUser: User = await updateUser(user, name, email);

    if (!updatedUser) {
      return res.status(StatusCodes.BAD_REQUEST).json(<IResponseSchema>{
        message: MessageResponse.Error,
        description: "Error while updating user",
        data: [],
      });
    }

    const tokenUser = createTokenUser(updatedUser);
    return res.status(StatusCodes.OK).json(<IResponseSchema>{
      message: MessageResponse.Success,
      description: "User Updated",
      data: tokenUser,
    });
  }

  public async updateUserPassword(req: CustomRequest, res: Response) {
    const { oldPassword, newPassword } = req.body;
    console.log(oldPassword, newPassword);

    const userId: any = req.user?.userId;

    const user: User | null = await getSingleUser(userId);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json(<IResponseSchema>{
        message: MessageResponse.Error,
        description: "There is no user with this id.",
        data: [],
      });
    }

    const isPasswordCorrect: boolean = await user.comparePassword(oldPassword);
    console.log("we actually got here as well");

    if (!isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).json(<IResponseSchema>{
        message: MessageResponse.Error,
        description: "Incorrect Password",
        data: [],
      });
    }

    await updateUserPassword(user, newPassword);

    return res.status(StatusCodes.OK).json(<IResponseSchema>{
      message: MessageResponse.Success,
      description: "password has been updated successfully",
      data: [],
    });
  }
}

export const userController = new UserController();
