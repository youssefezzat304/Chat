"use client";
import { useEffect, useState } from "react";
import DisplayImage from "../components/others/DisplayImage";
import { useFindChat, useGetMessages } from "../utils/queries/chat.query";
import { MessageInterface } from "../utils/types/chat.interfaces";
import { CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import { useUserStore } from "../utils/stores/user.store";

export const MessagesSystem = () => {
  const [messages, setMessages] = useState<JSX.Element[]>([]);
  const { allMessages } = useGetMessages();
  const { isLoading: findingChat } = useFindChat();

  useEffect(() => {
    if (Array.isArray(allMessages?.data)) {
      const newMessages = allMessages.data.map((message) => (
        <Message key={message._id} message={message} />
      ));
      setMessages(newMessages);
      console.log("ccc", allMessages);
    }
  }, [allMessages]);

  return (
    <>
      {findingChat ? (
        <div className="center-loading">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div className="messages-continer">{messages}</div>
      )}
    </>
  );
};

type MessageProps = {
  message: MessageInterface;
};
export const Message = ({ message }: MessageProps) => {
  const currentUser = useUserStore((state) => state.user);
  const isSentByCurrentUser = message.initiatedBy._id === currentUser?._id;
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
};
