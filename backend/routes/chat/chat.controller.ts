import { Request, Response, Router } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import { ChatModel } from "../models";

export class ChatController implements Controller {
  public path = "/chat";
  public router = Router();

  constructor() {
    this.initialiseRoutes();
  }
  private initialiseRoutes(): void {
    this.router.post(`${this.path}/create`, this.createChat);
    this.router.get(`${this.path}/get-chats/:userId`, this.getAllChats);
    this.router.get(`${this.path}/find-chat/:userId/:chatterId`, this.findChat);
  }

  private createChat = async (req: Request, res: Response) => {
    const { userId, chatterId } = req.body;
    try {
      if (!userId || !chatterId)
        return res.status(400).send("No info has been sent.");

      const chat = await ChatModel.findOne({
        participants: { $all: [userId, chatterId] },
      });

      if (chat) return res.status(200).send("Chat already existed.");

      const newChat = new ChatModel({ participants: [userId, chatterId] });
      await newChat.save();

      const currentChat = await ChatModel.findById(newChat._id)
        .populate("participants")
        .exec();
      return res.status(200).send(currentChat);
    } catch (error) {
      console.log("500 error", error);
      return res.status(500).send(error);
    }
  };
  private getAllChats = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
      if (!userId) return res.status(400).send("No info has been sent.");

      const chats = await ChatModel.find({
        participants: { $in: [userId] },
      });

      return res.status(200).send(chats);
    } catch (error) {
      console.log("500 error", error);
      return res.status(500).send(error);
    }
  };
  private findChat = async (req: Request, res: Response) => {
    const { userId, chatterId } = req.params;
    try {
      if (!userId || !chatterId)
        return res.status(400).send("No info has been sent.");

      const chat = await ChatModel.findOne({
        participants: { $all: [userId, chatterId] },
      })
        .populate("lastMessage")
        .populate("participants")
        .exec();

      return res.status(200).send(chat);
    } catch (error) {
      console.log("500 error", error);
      return res.status(500).send(error);
    }
  };
}
