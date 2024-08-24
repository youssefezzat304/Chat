import { findChat, getAllChats } from "@/app/api/chat.api";
import { useChatStore, useUserStore } from "../stores";
import { useQuery } from "@tanstack/react-query";
import { getMessages, joinPrivateChat } from "@/app/api/messages.api";
import { useEffect } from "react";
import { socket } from "@/app/socket";

export const useGetChats = () => {
  const currentUser = useUserStore((state) => state.user);
  const setRecentChats = useChatStore((state) => state.setRecentChats);
  const { data: allChats, isLoading } = useQuery({
    queryFn: () => getAllChats(currentUser?._id),
    queryKey: ["allChats"],
  });
  useEffect(() => {
    if (allChats) {
      setRecentChats(allChats.data);
    }
  }, [allChats, setRecentChats]);

  return { allChats, isLoading };
};
export const useFindChat = () => {
  const currentUser = useUserStore((state) => state.user);
  const chatWith = useChatStore((state) => state.chatWith);
  const setSelectedChatId = useChatStore((state) => state.setSelectedChatId);
  const selectedChatId = useChatStore((state) => state.selectedChatId);
  const { data: currentChat, isLoading } = useQuery({
    queryFn: () =>
      findChat({ userId: currentUser?._id, chatterId: chatWith?._id }),
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
    if (selectedChatId) {
      joinPrivateChat(socket, {
        chatId: selectedChatId,
        userId: currentUser?._id,
      });
    }
  }, [selectedChatId]);

  return { allMessages, isLoading };
};
