import { useUserStore } from "@/app/utils/stores/user.store";
import SearchBar from "./SearchBar";
import Subject from "./Subject";
import { useEffect, useState } from "react";
import { CurrentUser } from "@/app/utils/types/user.interfaces";

const Friends = () => {
  const user = useUserStore((state) => state.user);
  const [friendList, setFriendList] = useState<CurrentUser[] | undefined>([]);
  useEffect(() => {
    setFriendList(user?.friends);
  }, [user]);
  return (
    <main className="friendList-main">
      <SearchBar />
      {friendList?.map((friend: CurrentUser, index: any) => {
        return <Subject key={index} subject={friend} />;
      })}
    </main>
  );
};

export default Friends;
