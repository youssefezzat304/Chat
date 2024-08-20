import { createChat, getChat } from "@/app/api/chat.api";
import { useChatStore } from "../stores/chat.store";
import { useUserStore } from "../stores/user.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "@/app/api/messages.api";
import { useEffect, useState } from "react";

export const useGetMessages = () => {
  const selectedChatId = useChatStore((state) => state.selectedChatId);
  const { data: chatMessages, isLoading } = useQuery({
    queryFn: () => getMessages(selectedChatId),
    queryKey: ["chatInfo", selectedChatId],
    enabled: !!selectedChatId,
  });
  return { chatMessages, isLoading };
};
export const useHandleChat = () => {
  const [shouldCreateChat, setShouldCreateChat] = useState(false);
  const selectedChatId = useChatStore((state) => state.selectedChatId);
  const user = useUserStore((state) => state.user);

  const {
    mutateAsync: fetchChat,
    data: chatInfo,
    error: chatError,
    isPending: isLoadingChat,
  } = useMutation({
    mutationFn: () => getChat({ userId: user?._id, chatterId: selectedChatId }),
    onError: () => {
      setShouldCreateChat(true);
    },
  });
  const {
    mutateAsync: createNewChat,
    data: createdChatInfo,
    isPending: isLoadingCreateChat,
  } = useMutation({
    mutationFn: () =>
      createChat({ userId: user?._id, chatterId: selectedChatId }),
    onSuccess: () => {
      setShouldCreateChat(false);
    },
  });
  useEffect(() => {
    if (shouldCreateChat) {
      createNewChat();
    }
  }, [shouldCreateChat, createNewChat]);

  useEffect(() => {
    if (selectedChatId) {
      fetchChat();
    }
  }, [selectedChatId, fetchChat]);

  const isLoading = isLoadingChat || isLoadingCreateChat;
  const error = chatError || (shouldCreateChat ? undefined : null);

  return {
    chatInfo: chatInfo || createdChatInfo,
    isLoading,
    error,
  };
};
const useSendMessage = () => {
  const selectedChatId = useChatStore((state) => state.selectedChatId);
  const user = useUserStore((state) => state.user);
}
