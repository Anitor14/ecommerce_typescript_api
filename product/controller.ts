import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { productService } from "./service";
import { MessageResponse } from "../user/enums";
import { IResponseSchema } from "../user/interface";
import { UserPayload } from "../auth/interface";
import { userService } from "../user/service";
import { User } from "../user/entity";
import { Product } from "./entity";
const { getSingleUser } = userService;

const { createOneProduct } = productService;

type CustomRequest = Request & {
  user?: UserPayload;
};

class ProductController {
  public async createProduct(req: CustomRequest, res: Response) {
    const userId: any = req.user?.userId;
    const user: User | null = await getSingleUser(userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json(<IResponseSchema>{
        message: MessageResponse.Error,
        description: "There is no user with this id.",
        data: [],
      });
    }
    const newProduct: Product | null = await createOneProduct(req.body, user);
    if (!newProduct) {
      return res.status(StatusCodes.BAD_REQUEST).json(<IResponseSchema>{
        message: MessageResponse.Error,
        description: "There is no user with with this Id for this product",
        data: [],
      });
    }
    return res.status(StatusCodes.CREATED).json(<IResponseSchema>{
      message: MessageResponse.Success,
      description: "Product created successfully",
      data: newProduct,
    });
  }
}

export const productController = new ProductController();
