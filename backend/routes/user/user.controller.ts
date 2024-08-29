import { NextFunction, Request, Response, Router } from "express";
import UserService from "./user.service";
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

const userController = Router();
const userService = new UserService();
const authService = new AuthService();

const register = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
): Promise<Response | void> => {
  const body = req.body;

  try {
    const user = (await userService.signUp(body)) as DocumentType<User>;

    const accessToken = authService.signAccessToken(user);

    const refreshToken = await authService.signRefreshToken({
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

const logIn = async (
  req: Request<{}, {}, CreateSessionInput>,
  res: Response,
): Promise<Response | void> => {
  const message = "Invalid Email or password.";
  const { email, password } = req.body;

  const user = await userService.findUserByEmail(email);
  if (!user) return res.send(message);

  const isValid = await user.validatePassword(password);
  if (!isValid) return res.send(message);

  const findSession = (await SessionModel.findOne({
    user: user._id,
  })) as DocumentType<Session> | null;

  const accessToken = authService.signAccessToken(user);
  const refreshToken = findSession
    ? await authService.updateRefreshToken({
        userID: user._id.toString(),
      })
    : await authService.signRefreshToken({
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

const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
        .send({ message: "An error occurred while fetching user data" }),
    );
  }
};

const updateInfo = async (req: Request, res: Response) => {
  const { email } = req.body;
  const data = req.body;

  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await userService.updateUserByEmail(email, data);

    const updatedUser = await userService.findUserByEmail(email);

    return res.json(updatedUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "An error occurred while updating user information.",
    });
  }
};

const logOut = async (req: Request, res: Response) => {
  return res
    .clearCookie("accessToken", {
      httpOnly: true,
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
    })
    .send("logged out");
};

userController.post(
  process.env.SIGNUP_ENDPOINT as string,
  validateResourceMidlleware(createUserSchema),
  register,
);
userController.patch(
  process.env.UPDATE_USER_ENDPOINT as string,
  validateResourceMidlleware(UserSchema),
  updateInfo,
);
userController.get(process.env.CURRENT_USER_ENDPOINT as string, getCurrentUser);
userController.post(process.env.LOGIN_ENDPOINT as string, logIn);
userController.get(process.env.LOGOUT_ENDPOINT as string, logOut);

export default userController;
