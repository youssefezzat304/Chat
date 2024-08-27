import "dotenv/config";
import { initializeApp, listen } from "./app";
import "express-async-error";
import authController from "../routes/auth/auth.controller";
import chatController from "../routes/chat/chat.controller";
import FriendRequestController from "../routes/friendRequest/friendRequest.controller";
import messageController from "../routes/message/message.controller";
import uploadController from "../routes/upload/upload.controller";
import userController from "../routes/user/user.controller";

const controllers = [
  authController,
  chatController,
  FriendRequestController,
  messageController,
  uploadController,
  userController,
];

initializeApp(controllers);

listen();
