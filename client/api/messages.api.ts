import axios, { AxiosResponse } from "axios";
import { MessageType } from "../types/chat.types";
import { Socket } from "socket.io-client";
import { useChatStore } from "../utils/stores";

const orginURL = process.env.NEXT_PUBLIC_API_MESSAGES;

const api = axios.create({
  baseURL: orginURL,
});

export const getMessages = async (chatId?: string) => {
  try {
    const messages = (await api.get(`/get-messages/${chatId}`, {
      withCredentials: true,
    })) as AxiosResponse<MessageType[]>;
    return messages;
  } catch (error) {
    console.log(error);
  }
};

type SendMessageProps = {
  receivedByType: "user" | "group";
  chatId?: string;
  initiatedBy: string;
  receivedBy: string;
  content: string;
};
export const sendMessage = (
  socket: Socket,
  {
    chatId,
    initiatedBy,
    receivedBy,
    content,
    receivedByType,
  }: SendMessageProps,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      socket.emit("send_message", {
        chatId,
        initiatedBy,
        receivedBy,
        content,
        receivedByType,
      });
      resolve();
      setTimeout(() => {
        reject(new Error("Message not acknowledged by server"));
      }, 5000);
    } catch (error) {
      reject(error);
    }
  });
};
export const receiveMessage = (socket: Socket) => {
  socket.on("message_sent", (message: MessageType) => {
    useChatStore.getState().addMessage(message);
  });
};
export const joinPrivateChat = (
  socket: Socket,
  { chatId, userId }: { chatId: string; userId?: string },
) => {
  return new Promise((resolve, reject) => {
    try {
      socket.emit("join_priv_chat", { chatId, userId });
      socket.on("joined_room", (response) => {
        resolve(console.log("room connected", response));
      });
      socket.on("error", (errorMessage: string) => {
        reject(new Error(errorMessage));
      });
      setTimeout(() => {
        reject(new Error("Message not acknowledged by server"));
      }, 5000);
    } catch (error) {
      reject(error);
    }
  });
};
