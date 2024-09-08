import { Request } from "express";
import User from "../routes/user/user.schema";

declare global {
  namespace Express {
    export interface Request {
      user: any;
    }
    export interface Response {
      user: any;
    }
  }
}
