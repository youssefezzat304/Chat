import { Request, Response, Router } from "express";
import { Controller } from "../../utils/interfaces/interface";
import { ChatModel, MessageModel } from "../models";
import { DocumentType } from "@typegoose/typegoose";
import { Message } from "./message.model";
import { Chat } from "../chat/chat.model";

export class MessageController implements Controller {
  public path = "/messages";
  public router = Router();

  constructor() {
    this.initialiseRoutes();
  }
  private initialiseRoutes(): void {
    this.router.get(
      `${this.path}/get-messages/:userId/:chatterId`,
      this.getMessages
    );
  }

  private getMessages = async (req: Request, res: Response) => {
    const { userId, chatterId } = req.params;

    try {
      if (!userId || !chatterId)
        return res.status(400).send("No info has been sent.");

      let chat = (await ChatModel.findOne({
        participants: { $all: [userId, chatterId] },
      })
        .populate("lastMessage")
        .populate("participants")
        .exec()) as DocumentType<Chat>;

      if (!chat) {
        chat = new ChatModel({ participants: [userId, chatterId] });
        chat.save();
      }

      const messages = (await MessageModel.find({ chatId: chat._id })
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
