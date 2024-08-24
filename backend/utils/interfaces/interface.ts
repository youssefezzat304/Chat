import { Router } from "express";
import { Socket } from "socket.io";

export interface Controller {
  path: string;
  router: Router;
}
export interface SocketHandler {
  registerEvents(socket: Socket): void;
}
