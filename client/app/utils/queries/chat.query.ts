import { getAllChats } from "@/app/api/chat.api";
import { useChatStore } from "../stores/chat.store";
import { useUserStore } from "../stores/user.store";
import {  useQuery } from "@tanstack/react-query";
import { getMessages } from "@/app/api/messages.api";

export const useGetChats = () => {
  const currentUser = useUserStore((state) => state.user);
  const { data: allChats, isLoading } = useQuery({
    queryFn: () => getAllChats(currentUser?._id),
    queryKey: ["allChats"],
  });
  return { allChats, isLoading };
};
export const useGetMessages = () => {
  const selectedChatId = useChatStore((state) => state.selectedChatId);
  const { data: chatMessages, isLoading } = useQuery({
    queryFn: () => getMessages(selectedChatId),
    queryKey: ["chatInfo", selectedChatId],
    enabled: !!selectedChatId,
  });
  return { chatMessages, isLoading };
};

// const useSendMessage = () => {
//   const selectedChatId = useChatStore((state) => state.selectedChatId);
//   const user = useUserStore((state) => state.user);
// };
