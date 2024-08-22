import { Request, Response, Router } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import { ChatModel, MessageModel, UserModel } from "../models";
import { ChatService } from "../chat/chat.service";
import UserService from "../user/user.service";
import { DocumentType } from "@typegoose/typegoose";
import { Chat } from "../chat/chat.model";
import { Message } from "./message.model";

export class MessageController implements Controller {
  public path = "/messages";
  public router = Router();
  private chatService = new ChatService();
  private userService = new UserService();

  constructor() {
    this.initialiseRoutes();
  }
  private initialiseRoutes(): void {
    this.router.post(`${this.path}/send`, this.sendMesssage);
    this.router.get(`${this.path}/get-messages/:chatId`, this.getMessages);
  }

  private sendMesssage = async (req: Request, res: Response) => {
    const { initiatedBy, receivedBy, content } = req.body;

    if (!initiatedBy || !receivedBy) return res.status(400).send("wrong data");

    let chat = (await ChatModel.findOne({
      participants: { $all: [initiatedBy, receivedBy] },
    })) as DocumentType<Chat> | null;
    let message: DocumentType<Message>;

    try {
      if (!chat) {
        chat = await this.chatService.createNewChat({
          initiatedBy: initiatedBy,
          receivedBy: receivedBy,
        });
        message = new MessageModel({
          chatId: chat._id,
          initiatedBy,
          receivedBy,
          content,
        });
      } else {
        message = new MessageModel({
          chatId: chat._id,
          initiatedBy,
          receivedBy,
          content,
        });
      }

      await this.userService.addChatId({ userId: initiatedBy, chat: chat });
      await this.userService.addChatId({ userId: receivedBy, chat: chat });
      await chat.save();
      await message.save();
      const updatedChat = await ChatModel.findOneAndUpdate(
        { _id: chat._id },
        {
          $set: {
            lastMessage: message._id,
          },
        },
        { new: true }
      );

      return res.status(200).send(updatedChat);
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  private getMessages = async (req: Request, res: Response) => {
    const { chatId } = req.params;

    try {
      const messages = (await MessageModel.find({ chatId })
        .populate({
          path: "initiatedBy",
          select: "profilePic displayName",
        })
        .exec()) as [DocumentType<Message>];

      return res.status(200).send(messages);
    } catch (error) {
      return res.status(500).send(error);
    }
  };
}
