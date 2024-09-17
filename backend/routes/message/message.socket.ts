import { PrivateChatModel } from "../models";
import { Server, Socket } from "socket.io";
import {
  createMessage,
  findOrCreateChat,
  getPopulatedMessage,
  updateLastMessage,
  updateUserChats,
} from "./message.service";

const messageSocketHandler = (io: Server) => {
  const registerEvents = (socket: Socket) => {
    socket.on("send_message", async (data) => {
      const { chatId, initiatedBy, receivedBy, content } = data;

      if (!initiatedBy || !receivedBy) {
        socket.emit("error", "Invalid data");
        return;
      }

      try {
        const chat = await findOrCreateChat(chatId, initiatedBy, receivedBy);
        const message = await createMessage({
          chatId: chat._id,
          initiatedBy,
          receivedBy,
          content,
        });

        await Promise.all([
          updateUserChats({ userId: initiatedBy, chat }),
          updateUserChats({ userId: receivedBy, chat }),
          chat.save(),
          message.save(),
        ]);

        await updateLastMessage({ chatId: chat._id, messageId: message._id });

        const populatedMessage = await getPopulatedMessage(message._id);

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

    socket.on("leave_priv_chat", async (data) => {
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
        socket.leave(chatId);

        socket.emit("left_room", chatId);
      } catch (error) {
        socket.emit("error", "Error leaving private chat room.");
        console.error(error);
      }
    });
  };

  return { registerEvents };
};

export default messageSocketHandler;
