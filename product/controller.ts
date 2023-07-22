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

const {
  createOneProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = productService;

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

  public async getAllProducts(req: CustomRequest, res: Response) {
    const products = await getAllProducts();
    return res.status(StatusCodes.OK).json(<IResponseSchema>{
      message: MessageResponse.Success,
      description: "Successfully gotten all the products.",
      data: products,
    });
  }

  public async getSingleProduct(req: CustomRequest, res: Response) {
    const {
      params: { id: productId },
    } = req;

    const singleProduct: Product | null = await getSingleProduct(productId);

    if (!singleProduct) {
      return res.status(StatusCodes.NOT_FOUND).json(<IResponseSchema>{
        message: MessageResponse.Error,
        description: "There is no product with this id.",
        data: [],
      });
    }

    return res.status(StatusCodes.OK).json(<IResponseSchema>{
      message: MessageResponse.Success,
      description: `successfully gotten ${singleProduct.name} data `,
      data: singleProduct,
    });
  }

  public async updateProduct(req: CustomRequest, res: Response) {
    const {
      params: { id: productId },
    } = req;

    const singleProduct: Product | null = await getSingleProduct(productId);

    if (!singleProduct) {
      return res.status(StatusCodes.NOT_FOUND).json(<IResponseSchema>{
        message: MessageResponse.Error,
        description: "There is no product with this id.",
        data: [],
      });
    }

    const updatedProduct = await updateProduct(singleProduct, req.body);

    if (!updatedProduct) {
      return res.status(StatusCodes.BAD_REQUEST).json(<IResponseSchema>{
        message: MessageResponse.Error,
        description: "Error while updating Product",
        data: [],
      });
    }

    return res.status(StatusCodes.OK).json(<IResponseSchema>{
      message: MessageResponse.Success,
      description: "Product Updated",
      data: updatedProduct,
    });
  }

  public async deleteProduct(req: CustomRequest, res: Response) {
    const {
      params: { id: productId },
    } = req;

    const singleProduct: Product | null = await getSingleProduct(productId);

    if (!singleProduct) {
      return res.status(StatusCodes.NOT_FOUND).json(<IResponseSchema>{
        message: MessageResponse.Error,
        description: "There is no product with this id.",
        data: [],
      });
    }

    await deleteProduct(productId);

    return res.status(StatusCodes.OK).json(<IResponseSchema>{
      message: MessageResponse.Success,
      description: "Product Deleted Successfully",
      data: [],
    });
  }
}

export const productController = new ProductController();
