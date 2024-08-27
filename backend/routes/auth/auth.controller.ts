import { Request, Response, Router } from "express";
import AuthService from "./auth.service";
import { Controller } from "../../utils/interfaces/interface";
import { verifyJwt } from "../../utils/jwt";
import { UserModel } from "../models";
import { User } from "../user/user.model";
import { DocumentType } from "@typegoose/typegoose";

class AuthController implements Controller {
  public path = "/sessions";
  public router = Router();
  private auth = new AuthService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(`${this.path}/refresh`, this.refreshAccessTokenHandler);
  }

  private refreshAccessTokenHandler = async (req: Request, res: Response) => {
    const refreshToken = (req.cookies.refreshToken || "").split(
      " "
    )[1] as string;

    const decoded = verifyJwt<{ session: string }>(
      refreshToken,
      "refreshTokenPublicKey"
    );

    if (!decoded)
      return res.status(401).send("Could not refresh access token.");

    const session = await this.auth.findSessionById(decoded.session);

    if (!session || !session.valid)
      return res.status(401).send("Could not refresh access token");

    const user = (await UserModel.findById(String(session.user))
      .populate("friends")
      .populate("chats")
      .exec()) as DocumentType<User>;

    if (!user) return res.status(401).send("Could not refresh access token");

    const accessToken = this.auth.signAccessToken(user);

    return res.json({ accessToken });
  };
}

export default AuthController;
