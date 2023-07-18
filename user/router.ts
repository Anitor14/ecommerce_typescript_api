import { Router } from "express";
import { WrapAsync } from "../utils/wrapAsync";
// import { userValidator } from "./validator";
import { userController } from "./controller";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication";
import { userValidator } from "./validator";
const { updateUserValidator } = userValidator;

const { getAllUsers, getSingleUser, showCurrentUser, updateUser } =
  userController;

export const UserRouter = Router();

UserRouter.get(
  "/",
  authenticateUser,
  authorizePermissions("admin"),
  WrapAsync(getAllUsers)
);

UserRouter.get("/showMe", authenticateUser, WrapAsync(showCurrentUser));
UserRouter.patch(
  "/updateUser",
  updateUserValidator,
  authenticateUser,
  WrapAsync(updateUser)
);
UserRouter.get("/:id", authenticateUser, WrapAsync(getSingleUser));
