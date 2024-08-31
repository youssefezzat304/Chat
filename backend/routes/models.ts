import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { PrivateChat } from "./privateChat/privateChat.model";
import { User } from "./user/user.model";
import { Attachment } from "./attachment/attachment.model";
import { Message } from "./message/message.model";
import { FriendRequest } from "./friendRequest/friendRequest.model";
import { Session } from "./auth/session.model";
import { GroupChat } from "./groupChat/groupChat.model";

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
export const PrivateChatModel = getModelForClass(PrivateChat, {
  schemaOptions: {
    timestamps: true,
    collection: "privateChats",
  },
});
export const GroupChatModel = getModelForClass(GroupChat, {
  schemaOptions: {
    timestamps: true,
    collection: "groupChats",
  },
});
export const MessageModel = getModelForClass(Message, {
  schemaOptions: {
    timestamps: true,
  },
});
export const AttachmentModel = getModelForClass(Attachment, {
  schemaOptions: {
    timestamps: true,
  },
});
export const SessionModel = getModelForClass(Session, {
  schemaOptions: {
    timestamps: true,
  },
});
