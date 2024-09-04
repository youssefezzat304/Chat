import { useFindChat } from "@/utils/queries/chat.query";
import { useChatStore } from "@/utils/stores";
import { User } from "@/types/user.types";
import Image from "next/image";
import { AvatarPlaceholder1 } from "@/assets/avatarPlaceholder";

import styles from "./index.module.css";

const Friend = ({ friend }: { friend: User }) => {
  useFindChat();
  const setChatWith = useChatStore((state) => state.setChatWith);
  const { profilePicture, displayName } = friend;

  const handleSelectChatId = () => {
    setChatWith(friend);
  };
  return (
    <div
      className={`${styles.subjectMain} ${styles.friend}`}
      onClick={handleSelectChatId}
    >
      <Image
        className={styles.profilePic}
        alt={displayName}
        src={!profilePicture ? AvatarPlaceholder1 : profilePicture}
      />
      <section className={styles.friendName}>
        <label htmlFor="">{displayName}</label>
      </section>
    </div>
  );
};

export default Friend;
