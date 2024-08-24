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

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  }

  private sendMessage = async (data: any, socket: Socket) => {
    const { initiatedBy, receivedBy, content } = data;

    if (!initiatedBy || !receivedBy) {
      socket.emit("error", "Invalid data");
      return;
    }

    let chat = (await ChatModel.findOne({
      participants: { $all: [initiatedBy, receivedBy] },
    })) as DocumentType<Chat> | null;
    let message: DocumentType<Message>;

    try {
      if (!chat) {
        chat = await this.chatService.createNewChat({
          initiatedBy,
          receivedBy,
        });
        message = new MessageModel({
          chatId: chat._id,
          initiatedBy: initiatedBy,
          receivedBy:receivedBy,
          content,
        });
      } else {
        message = new MessageModel({
          chatId: chat._id,
          initiatedBy: initiatedBy,
          receivedBy: receivedBy,
          content,
        });
      }

      await this.userService.addChatId({ userId: initiatedBy, chat });
      await this.userService.addChatId({ userId: receivedBy, chat });
      await chat.save();
      await message.save();
      await ChatModel.findOneAndUpdate(
        { _id: chat._id },
        {
          $set: {
            lastMessage: message._id,
          },
        },
        { new: true }
      );

      socket.emit("message_sent", message);
    } catch (error) {
      socket.emit("error", "Error sending message");
      console.error(error);
    }
  };
}
