import { useUserStore } from "@/utils/stores";
import SearchBar from "../../common/Search/FriendsSearch";
import { User } from "@/types/user.types";
import Friend from "../../common/Entities/Friend";

import styles from "./index.module.css";

const Friends = () => {
  const currentUser = useUserStore((state) => state.user);

  return (
    <main className={styles.friendListMain}>
      <SearchBar />
      <div className={styles.friendList}>
        {currentUser?.friends?.map((friend: User) => {
          return <Friend key={friend._id} friend={friend} />;
        })}
      </div>
    </main>
  );
};

export default Friends;
