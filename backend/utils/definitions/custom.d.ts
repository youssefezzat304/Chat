import User from "../../routes/user/user.schema";

declare global {
  namespace Express {
    export interface Request {
      user: User;
      requester?: Types.ObjectId | string;
    }
  }
}
