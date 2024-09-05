"use client";
import { useEffect, useMemo } from "react";
import SearchBar from "../../common/Search/FriendsSearch";
import RecentChat from "../../common/Entities/RecentChat";
import EmptyChats from "../../SVGs/emptyChats";
import { useGetChats } from "@/utils/queries/chat.query";
import { useChatStore, useUserStore } from "@/utils/stores";
import { PrivateChat } from "@/types/chat.types";
import { CircularProgress } from "@mui/material";

import styles from "./index.module.css";

const Chats = () => {
  const { recentChats, setRecentChats } = useChatStore((state) => ({
    recentChats: state.recentChats,
    setRecentChats: state.setRecentChats,
  }));

  const currentUser = useUserStore((state) => state.user);
  const { allChats, isLoading } = useGetChats();

  useEffect(() => {
    const loadChats = () => {
      const storedChats = localStorage.getItem("recentChats");
      if (storedChats) {
        setRecentChats(JSON.parse(storedChats));
      }
    };

    loadChats();

    const handleStorageChange = (event: StorageEvent) => {
      loadChats();
      if (event.key === "recentChats") {
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [setRecentChats]);

  const filteredChats = useMemo(() => {
    return recentChats?.map((chat: PrivateChat) => {
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
    <section className={styles.friendListMain}>
      <SearchBar />
      {recentChats.length === 0 ? (
        <EmptyChats />
      ) : (
        <div className={styles.friendList}>{filteredChats}</div>
      )}
    </section>
  );
};

export default Chats;
