import axios, { AxiosResponse } from "axios";
import { PrivateChat } from "../types/chat.types";
import { axiosPrivate } from "./axios";

export const getAllChats = async (
  userId: string,
): Promise<PrivateChat[] | undefined> => {
  try {
    const chats = (await axiosPrivate.get(
      `/get-recent/${userId}`,
    )) as AxiosResponse<PrivateChat[]>;
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
    const chats = (await axiosPrivate.get(
      `/find-chat/${userId}/${chatterId}`,
    )) as AxiosResponse<PrivateChat>;
    return chats;
  } catch (error) {
    console.error("Error fetching chat:", error);
  }
};
