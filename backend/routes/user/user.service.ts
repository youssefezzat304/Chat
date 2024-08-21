import { Chat } from "../chat/chat.model";
import { UserModel } from "../models";
import { User } from "./user.model";
import { UserSchemaInput } from "./user.schema";

class UserService {
  private user = UserModel;

  public async signUp(input: Partial<User>): Promise<Error | any> {
    return UserModel.create(input)
      .then((user) => user)
      .catch((error) => {
        console.error("Error creating user:", error);
        return new Error("Failed to create user.");
      });
  }

  public async login(email: string) {
    const user = await this.user.findOne({ email });
    if (user === null) {
      return new Error("user === null");
    }

    try {
      return "login successfully";
    } catch (error) {
      return new Error("error:");
    }
  }

  public createUser(input: Partial<User>) {
    return UserModel.create(input);
  }

  public findUserById(id: string) {
    return UserModel.findById(id);
  }

  public findUserByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  public updateUserByEmail(email: string, data: UserSchemaInput) {
    return UserModel.updateOne(
      { email: email },
      {
        $set: data,
      }
    );
  }

  public addChatId = async ({
    userId,
    chat,
  }: {
    userId: string;
    chat: Chat;
  }) => {
    await UserModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: { chats: chat._id },
      },
      { new: true }
    );
  };
}

export default UserService;
