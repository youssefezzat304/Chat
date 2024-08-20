import { NextFunction, Request, Response } from "express";
import { BaseError, ErrorTitle, HttpStatusCode } from "../utils/exceptions/baseError.exception";

export function erroMiddleware(
  error: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof BaseError) {
    res.status(error.httpCode).send({
      title: error.title,
      status: error.httpCode,
      message: error.message,
    });
  }
  res.status(error.httpCode).send({
    title: ErrorTitle.ERROR,
    status: HttpStatusCode.INTERNAL_SERVER,
    message: "BAAAAAAAAAAD",
  });
  next();
}
