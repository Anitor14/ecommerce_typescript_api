import { Router } from "express";
import { WrapAsync } from "../utils";
import { productController } from "./controller";
import { productValidator } from "./validator";
import {
  authenticateUser,
  //   authorizePermissions,
} from "../middleware/authentication";

const { createProduct, getAllProducts, getSingleProduct } = productController;
const { createProductValidator, productIdValidator } = productValidator;
export const ProductRouter = Router();

ProductRouter.post(
  "/",
  authenticateUser,
  //   authorizePermissions("admin"),
  createProductValidator,
  WrapAsync(createProduct)
);

ProductRouter.get(
  "/",
  authenticateUser,
  //   authorizePermissions("admin"),
  WrapAsync(getAllProducts)
);

ProductRouter.get(
  "/:id",
  productIdValidator,
  authenticateUser,
  WrapAsync(getSingleProduct)
);
