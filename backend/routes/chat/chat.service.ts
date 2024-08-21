import { ChatModel } from "../models";

export class ChatService {
  public createNewChat = async ({
    initiatedBy,
    receivedBy,
  }: {
    initiatedBy: string;
    receivedBy: string;
  }) => {
    const chat = new ChatModel({
      participants: [initiatedBy, receivedBy],
    });

    await chat.save();
    return chat;
  };
}