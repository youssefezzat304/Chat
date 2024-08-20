import axios, { AxiosResponse } from "axios";
import { ChatInfo } from "../utils/types/chat.interfaces";

const orginURL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: orginURL,
});

export const getChat = async ({
  userId,
  chatterId,
}: {
  userId: string | undefined;
  chatterId: string | undefined;
}): Promise<AxiosResponse<ChatInfo> | undefined> => {
  try {
    const chat = await api.get(`/chat/find-chat/${userId}/${chatterId}`, {
      withCredentials: true,
    });
    console.log(chat);
    return chat;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
export const getAllChats = async (userId: string) => {
  try {
    const chats = await api.get(`/chat/get-chats/${userId}`, {
      withCredentials: true,
    });
    console.log(chats);
    return chats;
  } catch (error) {
    console.log(error);
  }
};
export const createChat = async ({
  userId,
  chatterId,
}: {
  userId: string | undefined;
  chatterId: string;
}): Promise<AxiosResponse<ChatInfo> | undefined> => {
  const data = {
    userId: userId,
    chatterId: chatterId,
  };
  try {
    const createdChat = await api.post("chat/create", data, {
      withCredentials: true,
    });
    console.log(createdChat);
    return createdChat;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
type SendMessageProps = {
  chatId: string;
  senderId: string | undefined;
  content: string;
};
export const sendMessage = async ({
  chatId,
  senderId,
  content,
}: SendMessageProps) => {
  const data = {
    chatId,
    senderId,
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
