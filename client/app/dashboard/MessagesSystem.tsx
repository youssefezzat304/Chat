"use client";
import { useEffect, useRef } from "react";
import { useGetMessages } from "../../utils/queries/chat.query";
import { CircularProgress } from "@mui/material";
import { useChatStore } from "../../utils/stores";
import { receiveMessage } from "../../api/messages.api";
import { socket } from "../socket";
import { ChatMessage } from "@/_components";
import styles from "./index.module.css";

export const MessagesSystem = () => {
  const messages = useChatStore((state) => state.messages);
  const { isLoading } = useGetMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    receiveMessage(socket);

    return () => {
      socket.off("message_sent");
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {isLoading ? (
        <div className={styles.centerLoading}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div className={styles.messagesContainer}>
          {messages.map((message) => {
            return <ChatMessage key={message._id} message={message} />;
          })}
          <span ref={messagesEndRef}></span>
        </div>
      )}
    </>
  );
};
