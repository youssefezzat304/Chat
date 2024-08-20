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
