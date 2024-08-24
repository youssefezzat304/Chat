import axios, { AxiosResponse } from "axios";
import { MessageInterface } from "../utils/types/chat.interfaces";
import { Socket } from "socket.io-client";

const orginURL = process.env.NEXT_PUBLIC_API_MESSAGES;

const api = axios.create({
  baseURL: orginURL,
});

export const getMessages = async ({
  userId,
  chatterId,
}: {
  userId?: string;
  chatterId?: string;
}) => {
  try {
    const messages = (await api.get(`/get-messages/${userId}/${chatterId}`, {
      withCredentials: true,
    })) as AxiosResponse<MessageInterface[]>;
    return messages;
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
  { initiatedBy, receivedBy, content }: SendMessageProps
) => {
  return new Promise((resolve, reject) => {
    try {
      socket.emit("send_message", { initiatedBy, receivedBy, content });

      socket.on("message_sent", (message: MessageInterface) => {
        resolve(message);
      });

      setTimeout(() => {
        reject(new Error("Message not acknowledged by server"));
      }, 5000); 
    } catch (error) {
      reject(error);
    }
  });
};
