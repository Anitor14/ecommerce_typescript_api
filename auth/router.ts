import { Router } from "express";
import { WrapAsync } from "../utils/wrapAsync";
import { userValidator } from "../user/validator";
import { authController } from "./controller";

const { create } = userValidator;
const { login, register, logout } = authController;

export const AuthRouter = Router();

AuthRouter.post("/register", create, WrapAsync(register));
AuthRouter.post("/login", WrapAsync(login));
AuthRouter.post("/logout", WrapAsync(logout));
