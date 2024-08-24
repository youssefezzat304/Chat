"use client";
import { memo, useEffect, useRef, useState } from "react";
import DisplayImage from "../components/others/DisplayImage";
import { useGetMessages } from "../utils/queries/chat.query";
import { MessageInterface } from "../utils/types/chat.interfaces";
import { CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import { useChatStore, useUserStore } from "../utils/stores";
import ScrollToBottom from "react-scroll-to-bottom";

export const MessagesSystem = () => {
  const messages = useChatStore((state) => state.messages);
  const { isLoading } = useGetMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {isLoading ? (
        <div className="center-loading">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <ScrollToBottom className="messages-container">
          {messages.map((message) => {
            return <Message key={message._id} message={message} />;
          })}
        </ScrollToBottom>
      )}
    </>
  );
};

type MessageProps = {
  message: MessageInterface;
};
export const Message = memo(({ message }: MessageProps) => {
  const currentUser = useUserStore((state) => state.user);
  const isSentByCurrentUser =
    (message.initiatedBy._id || message.initiatedBy) === currentUser?._id;
  return (
    <div
      className={`message-container ${
        isSentByCurrentUser ? "sent" : "received"
      }`}
    >
      {isSentByCurrentUser ? null : (
        <DisplayImage
          base64String={message.initiatedBy.profilePic}
          variant="rounded"
          className="message-pp"
        />
      )}
      <div
        className={`message-bubble ${
          isSentByCurrentUser ? "sent-bubble" : "received-bubble"
        }`}
      >
        {isSentByCurrentUser ? null : (
          <strong>{message.initiatedBy.displayName}</strong>
        )}
        <p>{message.content}</p>
        <p className="mssg-time">
          {dayjs(message.createdAt).format("DD/MM/YY hh:mm A")}
        </p>
      </div>
    </div>
  );
});
Message.displayName = "Message";
