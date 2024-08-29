import DisplayImage from "../../Display/ImageDisplay";
import { useChatStore, useUserStore } from "@/utils/stores";
import { useFindChat } from "@/utils/queries/chat.query";
import { SubjectProps } from "@/types/props.types";
import styles from "./index.module.css";
import useMobileStore from "@/utils/stores/mobile.store";
import { timestamp } from "@/utils/functions/time";

const RecentChat = ({ subject, lastMessage }: SubjectProps) => {
  const setChatWith = useChatStore((state) => state.setChatWith);
  const setMobileChats = useMobileStore((state) => state.setMobileChats);
  const currentUser = useUserStore((state) => state.user);
  const { isLoading } = useFindChat();
  const isSentByCurrentUser = lastMessage?.initiatedBy === currentUser?._id;

  const handleSelectChatId = () => {
    setChatWith(subject);
    setMobileChats(false);
  };
  return (
    <main className={styles.subjectMain} onClick={handleSelectChatId}>
      <div className={styles.subjectInfo}>
        <DisplayImage
          className={styles.friendPpContainer}
          variant="rounded"
          base64String={subject.profilePic}
          displayName={subject.displayName?.toUpperCase()}
        />
        <div className={styles.messegeInfo}>
          <section className={styles.top}>
            <label htmlFor="">{subject.displayName}</label>
            <p className={styles.lastSeen}>
              {timestamp(lastMessage?.createdAt)}
            </p>
          </section>
          <section className={styles.bottom}>
            <p className={styles.lastMassege}>
              {isSentByCurrentUser ? <span>You: </span> : null}
              {lastMessage?.content}
            </p>
            {/* <p className="notification-icon"></p> */}
          </section>
        </div>
      </div>
    </main>
  );
};

export default RecentChat;
