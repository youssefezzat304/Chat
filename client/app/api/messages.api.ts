import axios, { AxiosResponse } from "axios";
import { MessageInterface } from "../utils/types/chat.interfaces";

const orginURL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: orginURL,
});

export const getMessages = async (
  chatId: string | undefined
): Promise<AxiosResponse<MessageInterface[] | null> | undefined> => {
  try {
    const messages = await api.get(`/message/messages/${chatId}`, {
      withCredentials: true,
    });
    return messages;
  } catch (error) {
    console.log(error);
  }
};

type SendMessageProps = {
  chatId?: string;
  initiatedBy: string;
  receivedBy: string;
  content: string;
};
export const sendMessage = async ({
  chatId,
  initiatedBy,
  receivedBy,
  content,
}: SendMessageProps) => {
  const data = {
    chatId,
    initiatedBy,
    receivedBy,
    content,
  };
  try {
    const message = api.post("/message/create", data, {
      withCredentials: true,
    });
    return message;
  } catch (error) {
    console.log(error);
    return null;
  }
};
