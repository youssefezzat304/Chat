"use client";
import { useEffect, useRef } from "react";
import { useGetMessages } from "../../utils/queries/chat.query";
import { CircularProgress } from "@mui/material";
import { useChatStore } from "../../utils/stores";
import { receiveMessage } from "../../api/messages.api";
import { socket } from "../socket";
import { ChatMessage } from "@/_components";
import { groupMessagesByDay } from "@/utils/functions/time";

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

  const groupedMessages = groupMessagesByDay(messages);

  return (
    <>
      {isLoading ? (
        <div className={styles.centerLoading}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div className={styles.messagesContainer}>
          {Object.entries(groupedMessages).map(([dayLabel, msgs]) => (
            <div key={dayLabel}>
              <div className={styles.dayLabel}>
                <span>{dayLabel}</span>
              </div>
              {msgs.map((message, index) => {
                const isLastInStack =
                  index === msgs.length - 1 ||
                  msgs[index + 1].initiatedBy._id !== message.initiatedBy._id;

                return (
                  <ChatMessage
                    key={message._id}
                    message={message}
                    isLastInStack={isLastInStack}
                  />
                );
              })}
            </div>
          ))}
          <span ref={messagesEndRef}></span>
        </div>
      )}
    </>
  );
};
