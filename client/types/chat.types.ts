import { User } from "./user.types";

export interface ChatInfo {
  _id: string;
  participants: Array<User>;
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
