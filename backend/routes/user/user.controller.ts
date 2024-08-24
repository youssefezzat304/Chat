import { NextFunction, Request, Response, Router } from "express";
import { Controller } from "../../utils/interfaces/interface";
import UserService from "./user.service";
import { ValidationError } from "../../utils/exceptions/validationError.exception";
import { CreateUserInput, createUserSchema, UserSchema } from "./user.schema";
import { validateResourceMidlleware } from "../../middlewares/validateResource.middleware";
import { requireUserMiddleware } from "../../middlewares/requireUser.middleware";
import { CreateSessionInput } from "../auth/auth.schema";
import AuthService from "../auth/auth.service";
import { verifyJwt } from "../../utils/jwt";
import { SessionModel, UserModel } from "../models";
import { DocumentType } from "@typegoose/typegoose";
import { User } from "./user.model";
import { Session } from "../auth/session.model";

class UserController implements Controller {
  public path = "/users";
  public router = Router();
  private userService = new UserService();
  private auth = new AuthService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}/signup`,
      validateResourceMidlleware(createUserSchema),
      this.register
    );
    this.router.get(
      `${this.path}/me`,
      requireUserMiddleware,
      this.getCurrentUser
    );
    this.router.patch(
      `${this.path}/update-info`,
      validateResourceMidlleware(UserSchema),
      this.updateInfo
    );
    this.router.post(`${this.path}/login`, this.logIn);
    this.router.get(`${this.path}/logout`, this.logOut);
  }

  private register = async (
    req: Request<{}, {}, CreateUserInput>,
    res: Response
  ): Promise<Response | void | ValidationError> => {
    const body = req.body;

    try {
      const user = (await this.userService.signUp(body)) as DocumentType<User>;

      const accessToken = this.auth.signAccessToken(user);

      const refreshToken = await this.auth.signRefreshToken({
        userID: user._id.toString(),
      });

      const userInfo = verifyJwt(accessToken, "accessTokenPublicKey");

      if (userInfo) res.locals.user = userInfo;

      res.cookie("refreshToken", "Bearer " + refreshToken, {
        maxAge: 20 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.send({ userInfo, accessToken });
    } catch (error: any) {
      return res.status(500).send(error);
    }
  };

  private logIn = async (
    req: Request<{}, {}, CreateSessionInput>,
    res: Response
  ): Promise<Response | void> => {
    const message = "Invalid Email or password.";
    const { email, password } = req.body;

    const user = await this.userService.findUserByEmail(email);
    if (!user) return res.send(message);

    const isValid = await user.validatePassword(password);
    if (!isValid) return res.send(message);

    const findSession = (await SessionModel.findOne({
      user: user._id,
    })) as DocumentType<Session> | null;

    if (findSession) {
      const refreshToken = await this.auth.updateRefreshToken({
        userID: user._id.toString(),
      });

      const accessToken = this.auth.signAccessToken(user);
      const userInfo = verifyJwt(accessToken, "accessTokenPublicKey");

      if (userInfo) res.locals.user = userInfo;

      res.cookie("refreshToken", "Bearer " + refreshToken, {
        maxAge: 20 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.send({ userInfo, accessToken });
    }

    const accessToken = this.auth.signAccessToken(user);

    const refreshToken = await this.auth.signRefreshToken({
      userID: user._id.toString(),
    });

    const userInfo = verifyJwt(accessToken, "accessTokenPublicKey");

    if (userInfo) res.locals.user = userInfo;
    res.cookie("refreshToken", "Bearer " + refreshToken, {
      maxAge: 20 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.send({ userInfo, accessToken });
  };

  private getCurrentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = res.locals.user._id;

      const user = (await UserModel.findById(userId)
        .populate({
          path: "friendRequestsReceived",
          select: ["displayName", "profilePic"],
        })
        .populate("friends")
        .populate("chats")
        .exec()) as DocumentType<User> | null;

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      return res.send(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      return next(
        res
          .status(500)
          .send({ message: "An error occurred while fetching user data" })
      );
    }
  };
  private updateInfo = async (req: Request, res: Response) => {
    const { email } = req.body;
    const data = req.body;

    try {
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      await this.userService.updateUserByEmail(email, data);

      const updatedUser = await this.userService.findUserByEmail(email);

      return res.json(updatedUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "An error occurred while updating user information.",
      });
    }
  };
  private logOut = async (req: Request, res: Response) => {
    return res
      .clearCookie("accessToken", {
        httpOnly: true,
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
      })
      .redirect("/register");
  };
}

export default UserController;
