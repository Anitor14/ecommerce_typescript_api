import { Router } from "express";
import { WrapAsync } from "../utils/wrapAsync";
// import { userValidator } from "./validator";
import { userController } from "./controller";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication";
import { userValidator } from "./validator";
const { updateUserValidator, updateUserPasswordValidator, userIdValidator } =
  userValidator;

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = userController;

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
UserRouter.patch(
  "/updateUserPassword",
  updateUserPasswordValidator,
  authenticateUser,
  WrapAsync(updateUserPassword)
);
UserRouter.get(
  "/:id",
  userIdValidator,
  authenticateUser,
  WrapAsync(getSingleUser)
);
