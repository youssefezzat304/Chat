import { Socket } from "socket.io";

export interface SocketHandler {
  registerEvents(socket: Socket): void;
}
