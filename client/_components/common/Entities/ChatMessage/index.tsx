import { MessageType } from "@/types/chat.types";
import { useUserStore } from "@/utils/stores";
import { memo } from "react";
import styles from "./index.module.css";
import { messageTimestamp } from "@/utils/functions/time";
import Image from "next/image";
import { AvatarPlaceholder1 } from "@/assets/avatarPlaceholder";

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
        <Image
          src={
            !message.initiatedBy.profilePicture
              ? AvatarPlaceholder1
              : message.initiatedBy.profilePicture
          }
          alt="Profile Picture"
          className={styles.messageProfilePic}
        />
      )}
      <div
        className={`${styles.messageBubble} ${
          isSentByCurrentUser ? `${styles.sent}` : `${styles.received}`
        }`}
      >
        {!isSentByCurrentUser && message.receivedByType === "group" && (
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
