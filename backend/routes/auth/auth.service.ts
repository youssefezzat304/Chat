import { DocumentType } from "@typegoose/typegoose";
import { privateFeilds, User } from "../user/user.model";
import { signJwt } from "../../utils/jwt";
import { omit } from "lodash";
import { SessionModel } from "../models";
import { Types } from "mongoose";
import { Session } from "./session.model";

class AuthService {
  public signAccessToken(user: DocumentType<User>) {
    const payload = omit(user.toJSON(), [...privateFeilds, "profilePic"]);
    const accessToken = signJwt(payload, "accessTokenPrivateKey", {
      expiresIn: "15m",
    });

    return accessToken;
  }

  public async createSession({ userID }: { userID: string }) {
    return (await SessionModel.create({
      user: userID,
    })) as DocumentType<Session>;
  }

  public async findSessionById(id: Types.ObjectId | string) {
    return (await SessionModel.findById(id)) as DocumentType<Session> | null;
  }

  public async signRefreshToken({ userID }: { userID: string }) {
    const session = await this.createSession({ userID });

    const refreshToken = signJwt(
      { session: session._id },
      "refreshTokenPrivateKey",
      {
        expiresIn: "1y",
      }
    );
    session.token = refreshToken;
    await session.save();

    return refreshToken;
  }

  public async updateRefreshToken({ userID }: { userID: string }) {
    const session = await SessionModel.findOne({ user: userID });

    if (session) {
      const refreshToken = signJwt(
        { session: session._id },
        "refreshTokenPrivateKey",
        {
          expiresIn: "1y",
        }
      );

      await session.updateOne({ token: refreshToken });
      await session.save();

      return refreshToken;
    }

    return;
  }
}

export default AuthService;
