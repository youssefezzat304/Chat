"use client";
import SearchBar from "../others/SearchBar";
import Subject from "../entities/Subject";
import EmptyChats from "../SVGs/emptyChats";
import { useGetChats } from "@/app/utils/queries/chat.query";
import { useChatStore, useUserStore } from "@/app/utils/stores";
import { ChatInfo } from "@/app/utils/types/chat.interfaces";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

const Chats = () => {
  const recentChats = useChatStore((state) => state.recentChats);
  const setRecentChats = useChatStore((state) => state.setRecentChats);
  const currentUser = useUserStore((state) => state.user);
  const { allChats, isLoading } = useGetChats();

  useEffect(() => {
    if (recentChats.length === 0 && !isLoading && allChats) {
      setRecentChats(allChats.data);
    }
  }, [recentChats, isLoading, allChats, setRecentChats]);
  return (
    <main className="friendList-main">
      <SearchBar />
      {isLoading ? (
        <div className="center-loading">
          <CircularProgress color="secondary" />
        </div>
      ) : recentChats?.length === 0 ? (
        <EmptyChats />
      ) : (
        <div className="friend-list">
          {recentChats?.map((chat: ChatInfo) => {
            if (chat.participants[0]._id !== currentUser?._id) {
              return (
                <Subject
                  key={chat.participants[0]._id}
                  subject={chat.participants[0]}
                  lastMessage={chat.lastMessage}
                />
              );
            } else {
              return (
                <Subject
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
