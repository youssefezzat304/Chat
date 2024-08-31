import { DisplayImage } from "@/_components";
import { MessageType } from "@/types/chat.types";
import { useUserStore } from "@/utils/stores";
import { memo } from "react";
import styles from "./index.module.css";
import { messageTimestamp } from "@/utils/functions/time";
import { Avatar } from "@mui/material";

interface ChatMessageProps {
  message: MessageType;
  isLastInStack: boolean;
}

const ChatMessage = memo(({ message, isLastInStack }: ChatMessageProps) => {
  const currentUser = useUserStore((state) => state.user);
  const isSentByCurrentUser = message.initiatedBy._id === currentUser?._id;

  return (
    <div
      className={`${styles.messageContainer} ${
        isSentByCurrentUser
          ? `${styles.sent}`
          : `${isLastInStack ? styles.receivedLast : styles.received}`
      }`}
    >
      {!isSentByCurrentUser && isLastInStack && (
        <Avatar
          src={message.initiatedBy.profilePic}
          variant="rounded"
          className={styles.messageProfilePic}
        />
      )}
      <div
        className={`${styles.messageBubble} ${
          isSentByCurrentUser ? `${styles.sent}` : `${styles.received}`
        }`}
      >
        {!isSentByCurrentUser && (
          <strong>{message.initiatedBy.displayName}</strong>
        )}
        <p>{message.content}</p>
        <p className={styles.mssgTime}>{messageTimestamp(message.createdAt)}</p>
      </div>
    </div>
  );
});
ChatMessage.displayName = "Message";

export default ChatMessage;
