import { useChatStore, useUserStore } from "@/utils/stores";
import { SubjectProps } from "@/types/props.types";
import useMobileStore from "@/utils/stores/mobile.store";
import { timestamp } from "@/utils/functions/time";
import Image from "next/image";
import { AvatarPlaceholder1 } from "@/assets/avatarPlaceholder";

import styles from "./index.module.css";
import { useFindChat } from "@/utils/queries/chat.query";

const RecentChat = ({ subject, lastMessage }: SubjectProps) => {
  const setChatWith = useChatStore((state) => state.setChatWith);
  const setMobileChats = useMobileStore((state) => state.setMobileChats);
  const currentUser = useUserStore((state) => state.user);
  const { content, createdAt, initiatedBy } = lastMessage;
  const { profilePicture, displayName } = subject;
  const isSentByCurrentUser = initiatedBy._id === currentUser?._id;
  useFindChat();

  const handleSelectChatId = () => {
    setChatWith(subject);
    setMobileChats(false);
  };
  return (
    <main className={styles.subjectMain} onClick={handleSelectChatId}>
      <div className={styles.subjectInfo}>
        <Image
          className={styles.friendPpContainer}
          src={!profilePicture ? AvatarPlaceholder1 : profilePicture}
          alt={displayName}
        />
        <div className={styles.messegeInfo}>
          <section className={styles.top}>
            <label>{displayName}</label>
            <p className={styles.lastMessageTime}>{timestamp(createdAt)}</p>
          </section>
          <section className={styles.bottom}>
            <p className={styles.lastMassege}>
              {isSentByCurrentUser ? <span>You: </span> : null}
              {content}
            </p>
            {/* <p className="notification-icon"></p> */}
          </section>
        </div>
      </div>
    </main>
  );
};

export default RecentChat;
