import { Router } from "express";
import { WrapAsync } from "../utils";
import { productController } from "./controller";
import { productValidator } from "./validator";
import {
  authenticateUser,
  //   authorizePermissions,
} from "../middleware/authentication";

const { createProduct } = productController;
const { createProductValidator } = productValidator;
export const ProductRouter = Router();

ProductRouter.post(
  "/",
  authenticateUser,
  //   authorizePermissions("admin"),
  createProductValidator,
  WrapAsync(createProduct)
);
