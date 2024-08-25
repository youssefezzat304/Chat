"use client";
import { useEffect } from "react";
import SearchBar from "../../common/Search/FriendsSearch";
import RecentChat from "../../common/Entities/RecentChat";
import EmptyChats from "../../SVGs/emptyChats";
import { useGetChats } from "@/utils/queries/chat.query";
import { useChatStore, useUserStore } from "@/utils/stores";
import { ChatInfo } from "@/types/chat.types";
import { CircularProgress } from "@mui/material";

import styles from "./index.module.css";

const Chats = () => {
  const recentChats = useChatStore((state) => state.recentChats),
    setRecentChats = useChatStore((state) => state.setRecentChats),
    currentUser = useUserStore((state) => state.user),
    { allChats, isLoading } = useGetChats();

  useEffect(() => {
    if (recentChats.length === 0 && !isLoading && allChats) {
      setRecentChats(allChats.data);
    }
  }, [recentChats, isLoading, allChats, setRecentChats]);
  return (
    <main className={styles.friendListMain}>
      <SearchBar />
      {isLoading ? (
        <div className={styles.centerLoading}>
          <CircularProgress color="secondary" />
        </div>
      ) : recentChats?.length === 0 ? (
        <EmptyChats />
      ) : (
        <div className={styles.friendList}>
          {recentChats?.map((chat: ChatInfo) => {
            if (chat.participants[0]._id !== currentUser?._id) {
              return (
                <RecentChat
                  key={chat.participants[0]._id}
                  subject={chat.participants[0]}
                  lastMessage={chat.lastMessage}
                />
              );
            } else {
              return (
                <RecentChat
                  key={chat.participants[1]._id}
                  subject={chat.participants[1]}
                  lastMessage={chat.lastMessage}
                />
              );
            }
          })}
        </div>
      )}
    </main>
  );
};

export default Chats;
