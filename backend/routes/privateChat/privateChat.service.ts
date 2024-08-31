import { PrivateChatModel } from "../models";

export class PrivateChatService {
  public createNewChat = async ({
    initiatedBy,
    receivedBy,
  }: {
    initiatedBy: string;
    receivedBy: string;
  }) => {
    const chat = new PrivateChatModel({
      participants: [initiatedBy, receivedBy],
    });

    await chat.save();
    return chat;
  };
}
