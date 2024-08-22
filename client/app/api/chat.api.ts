import axios, { AxiosResponse } from "axios";
import { ChatInfo } from "../utils/types/chat.interfaces";

const orginURL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: orginURL,
});
export const getAllChats = async (
  userId?: string,
): Promise<AxiosResponse<ChatInfo[]> | undefined> => {
  try {
    const chats = (await api.get(`/chats/get-recent/${userId}`, {
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
    const chats = (await api.get(`/chats/find-chat/${userId}/${chatterId}`, {
      withCredentials: true,
    })) as AxiosResponse<ChatInfo>;
    return chats;
  } catch (error) {
    console.log(error);
  }
};
