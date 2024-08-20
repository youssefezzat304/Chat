import "dotenv/config";
import App from "./app";
import "express-async-error";
import UserController from "../routes/user/user.controller";
import AuthController from "../routes/auth/auth.controller";
import FriendRequestController from "../routes/friendRequest/friendRequest.controller";
import { UploadController } from "../routes/upload/upload.controller";
import { ChatController } from "../routes/chat/chat.controller";
import { MessageController } from "../routes/message/message.controller";

const app = new App(Number(process.env.PORT), [
  new UserController(),
  new AuthController(),
  new FriendRequestController(),
  new UploadController(),
  new ChatController(),
  new MessageController(),
]);

app.listen();
