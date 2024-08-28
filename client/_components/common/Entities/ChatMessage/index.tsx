import { DisplayImage } from "@/_components";
import { MessageInterface } from "@/types/chat.types";
import { useUserStore } from "@/utils/stores";
import { memo } from "react";
import styles from "./index.module.css";
import { assetTimestamp } from "@/utils/functions/time";

const ChatMessage = memo(({ message }: { message: MessageInterface }) => {
  const currentUser = useUserStore((state) => state.user);
  const isSentByCurrentUser = message.initiatedBy._id === currentUser?._id;

  return (
    <div
      className={`${styles.messageContainer} ${
        isSentByCurrentUser ? `${styles.sent}` : `${styles.received}`
      }`}
    >
      {isSentByCurrentUser ? null : (
        <DisplayImage
          base64String={message.initiatedBy.profilePic}
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
        <p className={styles.mssgTime}>{assetTimestamp(message.createdAt)}</p>
      </div>
    </div>
  );
});
ChatMessage.displayName = "Message";

export default ChatMessage;
