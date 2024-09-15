import { Request, Response, Router } from "express";
import AuthService from "./auth.service";
import { verifyJwt } from "../../utils/jwt";
import { UserModel } from "../models";
import { User } from "../user/user.model";
import { DocumentType } from "@typegoose/typegoose";
import { constants } from "../../utils/constants";

const authController = Router();
const auth = new AuthService();

const refreshAccessTokenHandler = async (req: Request, res: Response) => {
  const refreshToken = (req.cookies.refreshToken || "").split(" ")[1] as string;

  const decoded = verifyJwt<{ session: string }>(
    refreshToken,
    "refreshTokenPublicKey",
  );

  if (!decoded) return res.status(401).send("Could not refresh access token.");

  const session = await auth.findSessionById(decoded.session);

  if (!session || !session.valid)
    return res.status(401).send("Could not refresh access token");

  const user = (await UserModel.findById(String(session.user))
    .populate({
      path: "friendRequests",
      populate: [
        { path: "incoming", model: "User" },
        { path: "outgoing", model: "User" },
      ],
    })
    .populate("friends")
    .populate("chats")
    .exec()) as DocumentType<User>;

  if (!user) return res.status(401).send("Could not refresh access token");

  const accessToken = auth.signAccessToken(user);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: constants.REFRESH_TOKEN_TIMEOUT,
  });

  return res.status(200).send({ user });
};

const validateTokenHandler = async (req: Request, res: Response) => {
  const refreshToken = (req.cookies.refreshToken || "").split(" ")[1] as string;

  const decoded = verifyJwt<{ session: string }>(
    refreshToken,
    "refreshTokenPublicKey",
  );

  if (!decoded) return res.status(401).send("Could not refresh access token.");

  const session = await auth.findSessionById(decoded.session);

  if (!session || !session.valid)
    return res.status(401).send("Could not refresh access token");

  return res.status(200).send("Token is valid");
};

authController.post(
  process.env.REFRESH_TOKEN_ENDPOINT as string,
  refreshAccessTokenHandler,
);
authController.get(
  process.env.VALIDATE_TOKEN_ENDPOINT as string,
  validateTokenHandler,
);

export default authController;
