import DisplayImage from "../../Display/ImageDisplay";
import { useChatStore, useUserStore } from "@/utils/stores";
import dayjs from "dayjs";
import { useFindChat } from "@/utils/queries/chat.query";
import { SubjectProps } from "@/types/props.types";
import styles from "./index.module.css";

const RecentChat = ({ subject, lastMessage }: SubjectProps) => {
  const setChatWith = useChatStore((state) => state.setChatWith);
  const currentUser = useUserStore((state) => state.user);
  const { isLoading } = useFindChat();
  const isSentByCurrentUser = lastMessage?.initiatedBy === currentUser?._id;

  const handleSelectChatId = () => {
    setChatWith(subject);
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
              {dayjs(lastMessage?.createdAt).format("MM/DD/YY	h:mm A")}
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
