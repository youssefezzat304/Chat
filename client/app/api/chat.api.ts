import axios, { AxiosResponse } from "axios";
import { ChatInfo } from "../utils/types/chat.interfaces";

const orginURL = process.env.NEXT_PUBLIC_API_CHAT;

const api = axios.create({
  baseURL: orginURL,
});
export const getAllChats = async (
  userId?: string,
): Promise<AxiosResponse<ChatInfo[]> | undefined> => {
  try {
    const chats = (await api.get(`/get-recent/${userId}`, {
      withCredentials: true,
    })) as AxiosResponse<ChatInfo[]>;
    return chats;
  } catch (error) {
    console.log(error);
  }
};
export const findChat = async ({
  userId,
  chatterId,
}: {
  userId?: string;
  chatterId?: string;
}): Promise<AxiosResponse<ChatInfo> | undefined> => {
  try {
    const chats = (await api.get(`/find-chat/${userId}/${chatterId}`, {
      withCredentials: true,
    })) as AxiosResponse<ChatInfo>;
    return chats;
  } catch (error) {
    console.log(error);
  }
};
