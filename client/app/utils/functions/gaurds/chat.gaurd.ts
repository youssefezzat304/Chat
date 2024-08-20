import { ChatInfo, MessageInterface } from "../../types/chat.interfaces";
import { isCurrentUser } from "./user.gaurd";

export const isChatInfo = (obj: any): obj is ChatInfo => {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj._id === "string" &&
    Array.isArray(obj.participants) &&
    obj.participants.every((participant: any) => isCurrentUser(participant)) &&
    isMessage(obj.lastMessage) &&
    (obj.type === "private" || obj.type === "group") &&
    typeof obj.createdAt === "string" &&
    typeof obj.updatedAt === "string"
  );
};
export const isMessage = (obj: any): obj is MessageInterface => {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj._id === "string" &&
    typeof obj.chatId === "string" &&
    typeof obj.senderId === "string" &&
    typeof obj.content === "string" &&
    typeof obj.createdAt === "string" &&
    typeof obj.updatedAt === "string"
  );
};
