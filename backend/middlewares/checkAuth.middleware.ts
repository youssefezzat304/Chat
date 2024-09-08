import { Request, Response, NextFunction } from "express";
import { User } from "../routes/user/user.model";
import { verifyJwt } from "../utils/jwt";

const checkAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.cookies.accessToken;

  if (!authHeader) {
    return res.status(401).json({ message: "Access token required." });
  }

  const token = authHeader.split(" ")[1];

  try {
    verifyJwt(token, "accessTokenPublicKey") as User;
    // req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired access token." });
  }
};

export default checkAuthMiddleware;
