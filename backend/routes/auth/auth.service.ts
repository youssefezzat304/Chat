import { DocumentType } from "@typegoose/typegoose";
import { privateFeilds, User } from "../user/user.model";
import { signJwt } from "../../utils/jwt";
import { omit } from "lodash";
import { SessionModel } from "../models";

class AuthService {
  public signAccessToken(user: DocumentType<User>) {
    const payload = omit(user.toJSON(), [...privateFeilds, "profilePic"]);
    const accessToken = signJwt(payload, "accessTokenPrivateKey", {
      expiresIn: "15m",
    });

    return accessToken;
  }

  public async createSession({ userID }: { userID: string }) {
    return SessionModel.create({ user: userID });
  }

  public async findSessionById(id: string) {
    return SessionModel.findById(id);
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
