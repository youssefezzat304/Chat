import { Request, Response, Router } from "express";
import { MessageModel } from "../models";
import { DocumentType } from "@typegoose/typegoose";
import { Message } from "./message.model";

const messageController = Router();

const getMessages = async (req: Request, res: Response) => {
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

messageController.get(process.env.GET_MESSAGES_ENDPOINT as string, getMessages);

export default messageController;
