import { BaseError, ErrorMessage, ErrorTitle, HttpStatusCode } from "./baseError.exception";

export class ValidationError extends BaseError {
  public readonly title: ErrorTitle | string;
  public readonly httpCode: HttpStatusCode;

  constructor(
    title: ErrorTitle | string,
    httpCode: HttpStatusCode,
    description: ErrorMessage | string
  ) {
    super(title, httpCode, description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.title = title;
    this.httpCode = httpCode;

    Error.captureStackTrace(this, this.constructor);
  }
}