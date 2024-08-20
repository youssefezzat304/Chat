import axios, { AxiosResponse } from "axios";

const orginURL = "http://localhost:3000/api";

export const api = axios.create({
  baseURL: orginURL,
});

export const getChat = async ({
  userId,
  chatterId,
}: {
  userId: string | undefined;
  chatterId: string | undefined;
}) => {
  try {
    const chat = await api.get(`/chat/find-chat/${userId}/${chatterId}`, {
      withCredentials: true,
    });
    console.log(chat);
    return chat;
  } catch (error) {
    console.error(error);
  }
};
export const getAllChats = async (userId: string) => {
  try {
    const chats = await api.get(`/chat/get-chats/${userId}`, {
      withCredentials: true,
    });
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
}) => {
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
    return null
  }
};
export const getOrCreateChat = async ({
  userId,
  chatterId,
}: {
  userId: string | undefined;
  chatterId: string;
}): Promise<AxiosResponse | null> => {
  try {
    const chat = await getChat({ userId, chatterId });

    if (chat?.data) {
      return chat;
    }
  } catch (error) {
    console.log("Chat not found, creating a new one...");
  }
  try {
    const createdChat = await createChat({ userId, chatterId });
    return createdChat;
  } catch (error) {
    console.log("Failed to create chat:", error);
    return null;
  }
};
