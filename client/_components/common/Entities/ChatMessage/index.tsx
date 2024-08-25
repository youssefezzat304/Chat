import { DisplayImage } from "@/_components";
import { MessageInterface } from "@/types/chat.types";
import { useUserStore } from "@/utils/stores";
import dayjs from "dayjs";
import { memo } from "react";
import styles from "./index.module.css";

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
          className={`${styles.messageProfilePic}`}
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
        <p className={`${styles.mssgTime}`}>
          {dayjs(message.createdAt).format("DD/MM/YY hh:mm A")}
        </p>
      </div>
    </div>
  );
});
ChatMessage.displayName = "Message";

export default ChatMessage;
