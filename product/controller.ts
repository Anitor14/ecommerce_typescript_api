import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { productService } from "./service";
import { MessageResponse } from "../user/enums";
import { IResponseSchema } from "../user/interface";
import { UserPayload } from "../auth/interface";

const { createOneProduct } = productService;

type CustomRequest = Request & {
  user?: UserPayload;
};

class ProductController {
  public async createProduct(req: CustomRequest, res: Response) {
    const userId: any = req.user?.userId;
    const newProduct = await createOneProduct(req.body, userId);
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
