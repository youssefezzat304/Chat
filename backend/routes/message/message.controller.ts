import { Request, Response, Router } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import { MessageModel } from "../models";

export class MessageController implements Controller {
  public path = "/message";
  public router = Router();

  constructor() {
    this.initialiseRoutes();
  }
  private initialiseRoutes(): void {
    this.router.post(`${this.path}/message/create`, this.createMesssage);
    this.router.get(`${this.path}/message/messages/:chatId`, this.getMessages);
  }

  private createMesssage = async (req: Request, res: Response) => {
    const { chatId, senderId, content } = req.body;

    if (!chatId || !senderId || !content)
      return res.status(400).send("can't send the message.");

    const message = new MessageModel({
      chatId,
      senderId,
      content,
    });
    try {
      await message.save();
      return res.status(200).send("message has been sent.");
    } catch (error) {
      return res.status(500).send(error);
    }
  };
  private getMessages = async (req: Request, res: Response) => {
    const { chatId } = req.params;

    try {
      const messages = await MessageModel.find({ chatId });
      return res.status(200).send(messages);
    } catch (error) {
      return res.status(500).send(error);
    }
  };
}
