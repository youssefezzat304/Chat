import { useFindChat } from "@/utils/queries/chat.query";
import { useChatStore } from "@/utils/stores";
import DisplayImage from "../../Display/ImageDisplay";
import { User } from "@/types/user.types";
import styles from "./index.module.css";

const Friend = ({ friend }: { friend: User }) => {
  const setChatWith = useChatStore((state) => state.setChatWith);
  const { isLoading } = useFindChat();

  const handleSelectChatId = () => {
    setChatWith(friend);
  };
  return (
    <main
      className={`${styles.subjectMain} ${styles.friend}`}
      onClick={handleSelectChatId}
    >
      <DisplayImage
        className={styles.friendPpContainer}
        variant="rounded"
        base64String={friend.profilePic}
        displayName={friend.displayName?.toUpperCase()}
      />
      <section className={styles.friendName}>
        <label htmlFor="">{friend.displayName}</label>
      </section>
    </main>
  );
};

export default Friend;
