import { User } from "@/types/user.types";
import Image from "next/image";

import styles from "./index.module.css";
import { AvatarPlaceholder1 } from "@/assets/avatarPlaceholder";

const AddFriendToGroup = ({ friend }: { friend: User }) => {
  return (
    <div className={styles.container}>
      <section className={styles.subjectMain}>
        <Image
          className={styles.profilePic}
          alt="Profile Picture"
          src={
            !friend.profilePicture ? AvatarPlaceholder1 : friend.profilePicture
          }
        />
        <div className={styles.friendName}>
          <label htmlFor="">{friend.displayName}</label>
        </div>
      </section>

      <section className={styles.buttons}>
        <button className={styles.admin} type="button">
          Admin
        </button>
        <button className={styles.add} type="button">
          Add
        </button>
      </section>
    </div>
  );
};

export default AddFriendToGroup;
