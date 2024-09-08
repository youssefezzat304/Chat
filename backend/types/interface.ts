import { Socket } from "socket.io";
import { PrivateChat } from "../routes/privateChat/privateChat.model";

export interface SocketHandler {
  registerEvents(socket: Socket): void;
}

export type PrivateChatType = typeof PrivateChat;
