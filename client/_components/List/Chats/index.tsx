"use client";
import { useEffect, useMemo } from "react";
import SearchBar from "../../common/Search/FriendsSearch";
import RecentChat from "../../common/Entities/RecentChat";
import EmptyChats from "../../SVGs/emptyChats";
import { useGetChats } from "@/utils/queries/chat.query";
import { useChatStore, useUserStore } from "@/utils/stores";
import { ChatInfo } from "@/types/chat.types";
import { CircularProgress } from "@mui/material";

import styles from "./index.module.css";
import GroupSubjects from "@/_components/common/Entities/GroupSubjects";

const Chats = () => {
  const { recentChats, setRecentChats } = useChatStore((state) => ({
    recentChats: state.recentChats,
    setRecentChats: state.setRecentChats,
  }));

  const currentUser = useUserStore((state) => state.user);
  const { allChats, isLoading } = useGetChats();

  useEffect(() => {
    if (recentChats.length === 0 && !isLoading && allChats) {
      setRecentChats(allChats.data);
    }
  }, [recentChats.length, isLoading, allChats, setRecentChats]);

  const filteredChats = useMemo(() => {
    return recentChats?.map((chat: ChatInfo) => {
      const subject =
        chat.participants[0]._id !== currentUser?._id
          ? chat.participants[0]
          : chat.participants[1];
      return (
        <RecentChat
          key={subject._id}
          subject={subject}
          lastMessage={chat.lastMessage}
        />
      );
    });
  }, [recentChats, currentUser]);

  if (isLoading) {
    return (
      <div className={styles.centerLoading}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <main className={styles.friendListMain}>
      <SearchBar />
      <GroupSubjects styles={styles.groupSubjects} />
      {recentChats.length === 0 ? (
        <EmptyChats />
      ) : (
        <div className={styles.friendList}>{filteredChats}</div>
      )}
    </main>
  );
};

export default Chats;
