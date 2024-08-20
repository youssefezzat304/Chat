import { Request, Response, Router } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import { ChatModel, MessageModel, UserModel } from "../models";

export class MessageController implements Controller {
  public path = "/message";
  public router = Router();

  constructor() {
    this.initialiseRoutes();
  }
  private initialiseRoutes(): void {
    this.router.post(`${this.path}/create`, this.createMesssage);
    this.router.get(`${this.path}/messages/:chatId`, this.getMessages);
  }

  private createMesssage = async (req: Request, res: Response) => {
    const { chatId, senderId, content } = req.body;

    if (!chatId || !senderId || !content) return res.status(400).send(req.body);

    const message = new MessageModel({
      chatId,
      senderId,
      content,
    });
    try {
      const user = await UserModel.findById(senderId);
      await message.save();
      await ChatModel.findByIdAndUpdate(chatId, {
        $set: {
          lastMessage: message._id,
        },
      });

      if (!user?.chats.includes(chatId)) {
        await UserModel.findByIdAndUpdate(
          senderId,
          {
            $addToSet: {
              chats: chatId,
            },
          },
          { new: true }
        );
      }

      return res.status(200).send("message has been sent.");
    } catch (error) {
      return res.status(500).send(error);
    }
  };
  private getMessages = async (req: Request, res: Response) => {
    const { chatId } = req.params;

    try {
      const messages = await MessageModel.find({ chatId })
        .populate({
          path: "senderId",
          select: "profilePic displayName",
        })
        .exec();
      return res.status(200).send(messages);
    } catch (error) {
      return res.status(500).send(error);
    }
  };
}
