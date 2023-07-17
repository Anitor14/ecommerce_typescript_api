import { Router } from "express";
import { WrapAsync } from "../utils/wrapAsync";
import { userValidator } from "../user/validator";
import { authController } from "./controller";

const { registerValidator, loginValidator } = userValidator;
const { login, register, logout } = authController;

export const AuthRouter = Router();

AuthRouter.post("/register", registerValidator, WrapAsync(register));
AuthRouter.post("/login", loginValidator, WrapAsync(login));
AuthRouter.post("/logout", WrapAsync(logout));
