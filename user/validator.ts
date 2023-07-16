import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { IUser } from "./interface";
import { RoleFormat } from "./enums";

class UserValidator {
  public async create(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object<IUser>({
      email: Joi.string().email().required().messages({
        "string.base": "Email must be text",
        "string.email": "Invalid email format",
        "any.required": "Email is required.",
      }),
      password: Joi.string().required().messages({
        "string.base": "Password must be text",
        "any.required": "Password is required.",
      }),
      role: Joi.string()
        .valid(...Object.values(RoleFormat))
        .messages({
          "string.base": "Role must be a string.",
          "any.required": "Role is required.",
          "any.only": "Role must be one of the valid options.",
        }),
    });
    const { error } = schema.validate(req.body);
    if (!error) {
      return next();
    } else {
      return res.status(400).json({
        message: "error",
        description: error.details[0].message,
        data: "",
      });
    }
  }
}

export const userValidator = new UserValidator();
