import { Request, Response, Router } from "express";
import { Controller } from "../../utils/interfaces/interface";
import { MessageModel } from "../models";
import { DocumentType } from "@typegoose/typegoose";
import { Message } from "./message.model";

export class MessageController implements Controller {
  public path = "/messages";
  public router = Router();

  constructor() {
    this.initialiseRoutes();
  }
  private initialiseRoutes(): void {
    this.router.get(`${this.path}/get-messages/:chatId`, this.getMessages);
  }

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
