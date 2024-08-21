import { AxiosResponse } from "axios";
import { ChatInfo, MessageInterface } from "../../types/chat.interfaces";
import { isUser } from "./user.gaurd";

export const isChatInfo = (obj: any): obj is ChatInfo => {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj._id === "string" &&
    Array.isArray(obj.participants) &&
    obj.participants.every((participant: any) => isUser(participant)) &&
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

export function isChatArray(
  response: AxiosResponse<any>
): response is AxiosResponse<ChatInfo[]> {
  return (
    Array.isArray(response.data) &&
    response.data.every((item) => isChatInfo(item))
  );
}
