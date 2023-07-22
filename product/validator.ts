import Joi from "joi";
import { CategoryFormat, CompanyFormat } from "./enums";
import { Request, Response, NextFunction } from "express";
import { IResponseSchema } from "../user/interface";
import { IProduct } from "./interface";
import { MessageResponse } from "../user/enums";

class ProductValidator {
  public async createProductValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema = Joi.object<IProduct>({
      name: Joi.string().trim().required().max(100).messages({
        "string.base": "Name must be text",
        "string.empty": "Name cannot be empty",
        "string.max": "Name cannot be more than {#limit} characters",
        "any.required": "Name is required",
      }),
      price: Joi.number().required().messages({
        "number.base": "Price must be a number",
        "any.required": "Price is required",
      }),
      description: Joi.string().messages({
        "string.base": "Description must be a string",
      }),
      image: Joi.string().default("/uploads/example.jp"),
      category: Joi.string()
        .valid(...Object.values(CategoryFormat))
        .required()
        .messages({
          "any.only": "Invalid category",
          "any.required": "Category is required",
        }),
      company: Joi.string()
        .valid(...Object.values(CompanyFormat))
        .required()
        .messages({
          "any.only": "Invalid company",
          "any.required": "Company is required",
        }),
      colors: Joi.array()
        .items(Joi.string())
        .default(["#222"])
        .required()
        .messages({
          "array.base": "Colors must be an array",
          "array.items": "Colors must be an array of strings",
          "any.required": "Colors is required",
        }),
      featured: Joi.boolean().default(false),
      freeShipping: Joi.boolean().default(false),
      inventory: Joi.number().default(15).messages({
        "number.base": "Inventory must be a number",
        "any.required": "Inventory is required",
      }),
    });
    const { error } = schema.validate(req.body);
    if (!error) {
      return next();
    } else {
      return res.status(400).json(<IResponseSchema>{
        message: MessageResponse.Error,
        description: error.details[0].message,
        data: [],
      });
    }
  }
  public async productIdValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema = Joi.object({
      id: Joi.string().guid({ version: "uuidv4" }).required().messages({
        "string.base": "UUID must be a text",
        "string.guid": "Invalid UUID format",
        "any.required": "UUID is required.",
      }),
    });

    const { error } = schema.validate({ id: req.params.id });

    if (!error) {
      return next();
    } else {
      return res.status(400).json({
        message: "Error",
        description: error.details[0].message,
        data: [],
      });
    }
  }
}

export const productValidator = new ProductValidator();
