import { getModelForClass } from "@typegoose/typegoose";
import { Chat } from "./chat/chat.model";
import { User } from "./user/user.model";
import { UploadFile } from "./upload/upload.model";
import { Message } from "./message/message.model";
import { FriendRequest } from "./friendRequest/friendRequest.model";
import { Session } from "./auth/session.model";

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});
export const FriendRequestModel = getModelForClass(FriendRequest, {
  schemaOptions: {
    timestamps: true,
  },
});
export const ChatModel = getModelForClass(Chat, {
  schemaOptions: {
    timestamps: true,
  },
});
export const MessageModel = getModelForClass(Message, {
  schemaOptions: {
    timestamps: true,
  },
});
export const UploadFileModel = getModelForClass(UploadFile, {
  schemaOptions: {
    timestamps: true,
  },
});
export const SessionModel = getModelForClass(Session, {
  schemaOptions: {
    timestamps: true,
  },
});
