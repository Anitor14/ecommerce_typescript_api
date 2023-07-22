import { Router } from "express";
import { WrapAsync } from "../utils";
import { productController } from "./controller";
import { productValidator } from "./validator";
import {
  authenticateUser,
  // authorizePermissions,
} from "../middleware/authentication";

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = productController;
const { createProductValidator, productIdValidator, updateProductValidator } =
  productValidator;
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
  updateProductValidator,
  authenticateUser,
  WrapAsync(getSingleProduct)
);

ProductRouter.patch(
  "/:id",
  productIdValidator,
  updateProductValidator,
  authenticateUser,
  WrapAsync(updateProduct)
);

ProductRouter.delete(
  "/:id",
  productIdValidator,
  authenticateUser,
  // authorizePermissions("admin"),
  WrapAsync(deleteProduct)
);
