import axios, { AxiosResponse } from "axios";
import { PrivateChat } from "../types/chat.types";

const orginURL = process.env.NEXT_PUBLIC_API_CHAT;

const api = axios.create({
  baseURL: orginURL,
});

export const getAllChats = async (
  userId: string,
): Promise<PrivateChat[] | undefined> => {
  try {
    const chats = (await api.get(`/get-recent/${userId}`, {
      withCredentials: true,
    })) as AxiosResponse<PrivateChat[]>;
    console.log("chats", chats);
    return chats.data;
  } catch (error) {
    console.log(error);
  }
};

export const findChat = async ({
  userId,
  chatterId,
}: {
  userId: string;
  chatterId: string;
}): Promise<AxiosResponse<PrivateChat> | undefined> => {
  try {
    const chats = (await api.get(`/find-chat/${userId}/${chatterId}`, {
      withCredentials: true,
    })) as AxiosResponse<PrivateChat>;
    return chats;
  } catch (error) {
    console.log(error);
  }
};
