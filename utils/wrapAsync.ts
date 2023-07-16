import { NextFunction, Request, Response } from "express";

// middleware function to wrap controllers with try and catch

export const WrapAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
