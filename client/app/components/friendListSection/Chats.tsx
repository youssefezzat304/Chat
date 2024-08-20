import { useUserStore } from "@/app/utils/stores/user.store";
import SearchBar from "./SearchBar";
import Subject from "./Subject";
import { useEffect, useState } from "react";
import { CurrentUser } from "@/app/utils/types/user.interfaces";
import EmptyChats from "../SVGs/emptyChats";

const Chats = () => {
  const user = useUserStore((state) => state.user);
  const [chats, setChats] = useState<CurrentUser[] | undefined>([]);
  useEffect(() => {
    setChats(user?.chats);
  }, [user]);
  return (
    <main className="friendList-main">
      <SearchBar />
      {chats?.length === 0 ? (
        <EmptyChats />
      ) : (
        chats?.map((friend: CurrentUser, index: any) => {
          return <Subject key={index} subject={friend} />;
        })
      )}
    </main>
  );
};

export default Chats;
