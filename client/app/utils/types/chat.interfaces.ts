import { User } from "./user.interfaces";

export interface ChatInfo {
  _id: string;
  participants: User[];
  lastMessage: MessageInterface;
  type: "private" | "group";
  createdAt: string;
  updatedAt: string;
}
export interface MessageInterface {
  _id: string;
  chatId: string;
  initiatedBy: User;
  receivedBy: User;
  content: string;
  createdAt: string;
  updatedAt: string;
}
