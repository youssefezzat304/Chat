import { PrivateChatModel, MessageModel, UserModel } from "../models";
import { PrivateChatService } from "../privateChat/privateChat.service";
import UserService from "../user/user.service";
import { DocumentType } from "@typegoose/typegoose";
import { PrivateChat } from "../privateChat/privateChat.model";
import { Message } from "./message.model";
import { Server, Socket } from "socket.io";

const privateChatService = new PrivateChatService();
const userService = new UserService();

const createMessageSocketHandler = (io: Server) => {
  const registerEvents = (socket: Socket) => {
    socket.on("send_message", async (data) => {
      const { chatId, initiatedBy, receivedBy, content, receivedByType } = data;

      if (!initiatedBy || !receivedBy) {
        socket.emit("error", "Invalid data");
        return;
      }

      try {
        let chat = (await PrivateChatModel.findById(
          chatId,
        )) as DocumentType<PrivateChat> | null;

        if (!chat) {
          chat = await privateChatService.createNewChat({
            initiatedBy,
            receivedBy,
          });
        }
        const message = new MessageModel({
          chatId: chat._id,
          initiatedBy,
          receivedBy,
          content,
          receivedByType: "user",
        });

        await Promise.all([
          userService.addChatId({ userId: initiatedBy, chat }),
          userService.addChatId({ userId: receivedBy, chat }),
          chat.save(),
          message.save(),
        ]);

        await PrivateChatModel.findByIdAndUpdate(
          chat._id,
          { $set: { lastMessage: message._id } },
          { new: true },
        );
        const populatedMessage = (await MessageModel.findById(message._id)
          .populate({ path: "initiatedBy", select: "profilePic displayName" })
          .exec()) as DocumentType<Message>;

        io.to(chatId).emit("message_sent", populatedMessage);
      } catch (error) {
        socket.emit("error", "Error sending message");
        console.error(error);
      }
    });

    socket.on("join_priv_chat", async (data) => {
      const { chatId, userId } = data;

      if (!chatId) {
        socket.emit("error", "Invalid data");
        return;
      }
      const chat = await PrivateChatModel.findById(chatId);
      if (!chat) {
        socket.emit("error", "404 chat not found");
        return;
      }
      if (!chat.participants.includes(userId)) {
        socket.emit("error", "Unauthorized access");
        return;
      }

      try {
        socket.join(chatId);
        socket.emit("joined_room", chatId);
      } catch (error) {
        socket.emit("error", "Error joining private chat room.");
        console.error(error);
      }
    });
  };

  return { registerEvents };
};

export default createMessageSocketHandler;
