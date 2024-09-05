import { DocumentType } from "@typegoose/typegoose";
import { MessageModel, PrivateChatModel } from "../models";
import { PrivateChat } from "../privateChat/privateChat.model";
import UserService from "../user/user.service";
import { createNewChat } from "../privateChat/privateChat.service";
import { ObjectId, Types } from "mongoose";

const userService = new UserService();

export const findOrCreateChat = async (
  chatId: string | ObjectId,
  initiatedBy: string,
  receivedBy: string,
): Promise<DocumentType<PrivateChat>> => {
  let chat = (await PrivateChatModel.findById(
    chatId,
  )) as DocumentType<PrivateChat>;
  if (!chat) {
    chat = await createNewChat({ initiatedBy, receivedBy });
  }
  return chat;
};

export const createMessage = async ({
  chatId,
  initiatedBy,
  receivedBy,
  content,
}: {
  chatId: string | Types.ObjectId;
  initiatedBy: string;
  receivedBy: string;
  content: string;
}) => {
  return new MessageModel({
    chatId,
    initiatedBy,
    receivedBy,
    content,
    receivedByType: "user",
  });
};

export const updateUserChats = async ({
  userId,
  chat,
}: {
  userId: string | Types.ObjectId;
  chat: DocumentType<PrivateChat>;
}) => {
  return userService.addChatId({ userId, chat });
};

export const updateLastMessage = async ({
  chatId,
  messageId,
}: {
  chatId: string | Types.ObjectId;
  messageId: string | Types.ObjectId;
}) => {
  return PrivateChatModel.findByIdAndUpdate(
    chatId,
    { $set: { lastMessage: messageId } },
    { new: true },
  );
};

export const getPopulatedMessage = async (
  messageId: string | Types.ObjectId,
) => {
  return MessageModel.findById(messageId)
    .populate({ path: "initiatedBy", select: "profilePic displayName" })
    .exec();
};
