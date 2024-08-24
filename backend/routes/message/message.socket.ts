import { ChatModel, MessageModel, UserModel } from "../models";
import { ChatService } from "../chat/chat.service";
import UserService from "../user/user.service";
import { DocumentType } from "@typegoose/typegoose";
import { Chat } from "../chat/chat.model";
import { Message } from "./message.model";
import { Server, Socket } from "socket.io";
import { SocketHandler } from "../../utils/interfaces/interface";

export class MessageSocket implements SocketHandler {
  private chatService = new ChatService();
  private userService = new UserService();

  constructor(private io: Server) {}

  public registerEvents(socket: Socket) {
    socket.on("send_message", (data) => this.sendMessage(data, socket));
    socket.on("join_priv_chat", (data) =>
      this.joinPrivateChatRoom(data, socket)
    );

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  }

  private sendMessage = async (data: any, socket: Socket) => {
    const { chatId, initiatedBy, receivedBy, content } = data;

    if (!initiatedBy || !receivedBy) {
      socket.emit("error", "Invalid data");
      return;
    }

    try {
      let chat = (await ChatModel.findById(
        chatId
      )) as DocumentType<Chat> | null;

      if (!chat) {
        chat = await this.chatService.createNewChat({
          initiatedBy,
          receivedBy,
        });
      }
      const message = new MessageModel({
        chatId: chat._id,
        initiatedBy,
        receivedBy,
        content,
      });

      await Promise.all([
        this.userService.addChatId({ userId: initiatedBy, chat }),
        this.userService.addChatId({ userId: receivedBy, chat }),
        chat.save(),
        message.save(),
      ]);

      await ChatModel.findByIdAndUpdate(
        chat._id,
        { $set: { lastMessage: message._id } },
        { new: true }
      );
      const populatedMessage = (await MessageModel.findById(message._id)
        .populate({
          path: "initiatedBy",
          select: "profilePic displayName",
        })
        .exec()) as DocumentType<Message>;

      this.io.to(chatId).emit("message_sent", populatedMessage);
    } catch (error) {
      socket.emit("error", "Error sending message");
      console.error(error);
    }
  };

  private joinPrivateChatRoom = async (data: any, socket: Socket) => {
    const { chatId, userId } = data;

    if (!chatId) {
      socket.emit("error", "Invalid data");
      return;
    }
    const chat = await ChatModel.findById(chatId);
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
  };
}
