import axios, { AxiosResponse } from "axios";
import { MessageType, PrivateChat } from "../types/chat.types";
import { Socket } from "socket.io-client";
import { useChatStore } from "../utils/stores";

const orginURL = process.env.NEXT_PUBLIC_API_MESSAGES;

const api = axios.create({
  baseURL: orginURL,
});

export const getMessages = async (
  chatId: string,
): Promise<AxiosResponse<MessageType[]> | undefined> => {
  try {
    const data = (await api.get(`/get-messages/${chatId}`, {
      withCredentials: true,
    })) as AxiosResponse<MessageType[]>;
    return data;
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
export const sendMessage = (
  socket: Socket,
  { chatId, initiatedBy, receivedBy, content }: SendMessageProps,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      socket.emit("send_message", {
        chatId,
        initiatedBy,
        receivedBy,
        content,
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

    const storedChats = localStorage.getItem("recentChats");
    const recentChats = storedChats ? JSON.parse(storedChats) : [];

    const updatedChats = recentChats.map((chat: PrivateChat) => {
      if (chat._id === message.chatId) {
        return {
          ...chat,
          lastMessage: {
            content: message.content,
            createdAt: message.createdAt,
            initiatedBy: message.initiatedBy._id,
          },
        };
      }
      return chat;
    });

    localStorage.setItem("recentChats", JSON.stringify(updatedChats));
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

export const leavePrivateChat = (
  socket: Socket,
  { chatId, userId }: { chatId: string; userId?: string },
) => {
  return new Promise((resolve, reject) => {
    try {
      socket.emit("leave_priv_chat", { chatId, userId });

      socket.on("left_room", (response) => {
        resolve(console.log("left room", response));
      });

      socket.on("error", (errorMessage: string) => {
        reject(new Error(errorMessage));
      });

      setTimeout(() => {
        reject(new Error("Leave message not acknowledged by server"));
      }, 5000);
    } catch (error) {
      reject(error);
    }
  });
};
