import { CurrentUser } from "./user.interfaces";

export interface ChatInfo {
  _id: string;
  participants: CurrentUser[];
  lastMessage: MessageInterface;
  type: "private" | "group";
  createdAt: string;
  updatedAt: string;
}
export interface MessageInterface {
  _id: string;
  chatId: string;
  senderId: CurrentUser;
  content: string;
  createdAt: string;
  updatedAt: string;
}
