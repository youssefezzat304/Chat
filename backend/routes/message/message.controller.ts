import { Request, Response, Router } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import { ChatModel, MessageModel, UserModel } from "../models";
import { MessageService } from "./message.service";
import { ChatService } from "../chat/chat.service";
import UserService from "../user/user.service";

export class MessageController implements Controller {
  public path = "/message";
  public router = Router();
  private chatService = new ChatService();
  private userService = new UserService();

  constructor() {
    this.initialiseRoutes();
  }
  private initialiseRoutes(): void {
    this.router.post(`${this.path}/create`, this.createMesssage);
    this.router.get(`${this.path}/messages/:chatId`, this.getMessages);
  }

  private createMesssage = async (req: Request, res: Response) => {
    console.log(req.body);
    const { initiatedBy, receivedBy, content } = req.body;

    if (!initiatedBy || !receivedBy) return res.status(400).send("wrong data");

    let chat = await ChatModel.findOne({
      participants: [initiatedBy, receivedBy],
    });
    let message;

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
      chat.updateOne({
        $set: {
          lastMessage: message._id,
        },
      });

      return res.status(200).send(chat);
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  private getMessages = async (req: Request, res: Response) => {
    const { chatId } = req.params;

    try {
      const messages = await MessageModel.find({ chatId })
        .populate({
          path: "initiatedBy",
          select: "profilePic displayName",
        })
        .exec();
      return res.status(200).send(messages);
    } catch (error) {
      return res.status(500).send(error);
    }
  };
}
