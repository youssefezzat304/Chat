import { Request, Response, Router } from "express";
import {Controller} from "../../utils/interfaces/interface";
import { ChatModel, UserModel } from "../models";
import { DocumentType } from "@typegoose/typegoose";
import { User } from "../user/user.model";
import { Chat } from "./chat.model";

export class ChatController implements Controller {
  public path = "/chats";
  public router = Router();

  constructor() {
    this.initialiseRoutes();
  }
  private initialiseRoutes(): void {
    this.router.get(`${this.path}/get-recent/:userId`, this.getRecentChats);
    this.router.get(`${this.path}/find-chat/:userId/:chatterId`, this.findChat);
  }
  private getRecentChats = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
      if (!userId) return res.status(400).send("No info has been sent.");

      const user = (await UserModel.findById(userId)
        .populate({
          path: "chats",
          populate: [
            { path: "participants", select: ["displayName", "profilePic"] },
            {
              path: "lastMessage",
              select: ["content", "createdAt", "initiatedBy"],
            },
          ],
        })
        .exec()) as DocumentType<User> | null;
      const chats = user?.chats;

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

      return res.status(200).send(chat);
    } catch (error) {
      console.log("500 error", error);
      return res.status(500).send(error);
    }
  };
}
