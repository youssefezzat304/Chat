"use client";
import { findChat, getAllChats } from "@/api/chat.api";
import { useChatStore, useUserStore } from "../stores";
import { useQuery } from "@tanstack/react-query";
import {
  getMessages,
  joinPrivateChat,
  leavePrivateChat,
} from "@/api/messages.api";
import { useEffect } from "react";
import { socket } from "@/app/socket";
import { PrivateChat } from "@/types/chat.types";

export const useGetChats = () => {
  const currentUser = useUserStore((state) => state.user);
  const setRecentChats = useChatStore((state) => state.setRecentChats);

  if (!currentUser) throw new Error("No current User");

  const cachedChats = localStorage.getItem("recentChats");
  const initialChats: PrivateChat[] | null = cachedChats
    ? JSON.parse(cachedChats)
    : null;

  const {
    data: allChats,
    isLoading,
    isError,
    error,
  } = useQuery<PrivateChat[] | undefined>({
    queryFn: () => getAllChats(currentUser._id),
    queryKey: ["allChats"],
    enabled: !initialChats || initialChats.length === 0,
  });

  useEffect(() => {
    if (allChats && !isLoading && !isError) {
      setRecentChats(allChats);
      localStorage.setItem("recentChats", JSON.stringify(allChats));
    }
  }, [allChats, setRecentChats, isError, error, isLoading]);

  return { allChats, isLoading };
};

export const useFindChat = () => {
  const currentUser = useUserStore((state) => state.user);
  const chatWith = useChatStore((state) => state.chatWith);
  const setSelectedChatId = useChatStore((state) => state.setSelectedChatId);
  const selectedChatId = useChatStore((state) => state.selectedChatId);

  const { data: currentChat, isLoading } = useQuery({
    queryFn: async () => {
      if (currentUser && chatWith) {
        const data = await findChat({
          userId: currentUser._id,
          chatterId: chatWith._id,
        });
        return data;
      }
    },
    queryKey: ["currentChat", chatWith],
    enabled: !!chatWith,
  });
  useEffect(() => {
    if (currentChat) {
      setSelectedChatId(currentChat.data._id);
    }
  }, [setSelectedChatId, currentChat, selectedChatId, currentUser]);

  return { currentChat, isLoading };
};

export const useGetMessages = () => {
  const setMessages = useChatStore((state) => state.setMessages);
  const selectedChatId = useChatStore((state) => state.selectedChatId);
  const currentUser = useUserStore((state) => state.user);

  const { data: allMessages, isLoading } = useQuery({
    queryFn: () => getMessages(selectedChatId),
    queryKey: ["allMessages", selectedChatId],
    enabled: !!selectedChatId,
  });
  useEffect(() => {
    if (allMessages) {
      setMessages(allMessages.data);
    }
  }, [allMessages, setMessages]);

  useEffect(() => {
    if (!currentUser || !selectedChatId) return;

    joinPrivateChat(socket, {
      chatId: selectedChatId,
      userId: currentUser._id,
    });

    return () => {
      leavePrivateChat(socket, {
        chatId: selectedChatId,
        userId: currentUser._id,
      });
    };
  }, [selectedChatId, currentUser]);

  return { allMessages, isLoading };
};
