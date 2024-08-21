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
    const chat = await api.get(`/chats/find-chat/${userId}/${chatterId}`, {
      withCredentials: true,
    });
    return chat;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
export const getAllChats = async (
  userId?: string
): Promise<AxiosResponse<ChatInfo[], any> | undefined> => {
  try {
    const chats = await api.get(`/chats/get-recent/${userId}`,{
      withCredentials: true,
    });
    return chats;
  } catch (error) {
    console.log(error);
  }
};

