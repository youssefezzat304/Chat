import { Request, Response, Router } from "express";
import { PrivateChatModel, UserModel } from "../models";
import { DocumentType } from "@typegoose/typegoose";
import { User } from "../user/user.model";
import { PrivateChat } from "./privateChat.model";

const chatController = Router();

const getRecentChats = async (req: Request, res: Response) => {
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

const findChat = async (req: Request, res: Response) => {
  const { userId, chatterId } = req.params;
  try {
    if (!userId || !chatterId)
      return res.status(400).send("No info has been sent.");

    let chat = (await PrivateChatModel.findOne({
      participants: { $all: [userId, chatterId] },
    })
      .populate("lastMessage")
      .populate("participants")
      .exec()) as DocumentType<PrivateChat>;

    if (!chat) {
      chat = new PrivateChatModel({ participants: [userId, chatterId] });
      await chat.save();
    }

    return res.status(200).send(chat);
  } catch (error) {
    console.log("500 error", error);
    return res.status(500).send(error);
  }
};

chatController.get(process.env.RECENT_CHATS_ENDPOINT as string, getRecentChats);
chatController.get(process.env.RECENT_FIND_CHAT_ENDPOINT as string, findChat);

export default chatController;
