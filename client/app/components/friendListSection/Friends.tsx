import { useUserStore } from "@/app/utils/stores";
import SearchBar from "./SearchBar";
import Subject from "./Subject";
import { useEffect, useState } from "react";
import { User } from "@/app/utils/types/user.interfaces";

const Friends = () => {
  const user = useUserStore((state) => state.user);
  const [friendList, setFriendList] = useState<User[] | undefined>([]);
  useEffect(() => {
    setFriendList(user?.friends);
  }, [user]);
  return (
    <main className="friendList-main">
      <SearchBar />
      {friendList?.map((friend: User) => {
        return <Subject key={friend._id} subject={friend} />;
      })}
    </main>
  );
};

export default Friends;
