import { Router } from "express";
import { WrapAsync } from "../utils/wrapAsync";
// import { userValidator } from "./validator";
import { userController } from "./controller";
// import { authenticateUser } from "../middleware/authentication";

const { getAllUsers } = userController;

export const UserRouter = Router();

UserRouter.get("/", WrapAsync(getAllUsers));
