import { findChat, getAllChats } from "@/app/api/chat.api";
import { useChatStore } from "../stores/chat.store";
import { useUserStore } from "../stores/user.store";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/app/api/messages.api";

export const useGetChats = () => {
  const currentUser = useUserStore((state) => state.user);
  const { data: allChats, isLoading } = useQuery({
    queryFn: () => getAllChats(currentUser?._id),
    queryKey: ["allChats"],
  });
  return { allChats, isLoading };
};
export const useFindChat = () => {
  const currentUser = useUserStore((state) => state.user);
  const chatWith = useChatStore((state) => state.chatWith);
  const setSelectedChatId = useChatStore((state) => state.setSelectedChatId);
  const { data: currentChat, isLoading } = useQuery({
    queryFn: () =>
      findChat({ userId: currentUser?._id, chatterId: chatWith?._id }),
    queryKey: ["allMessages", chatWith],
    enabled: !!chatWith,
  });
  if (currentChat) {
    setSelectedChatId(currentChat.data._id);
  }
  return { currentChat, isLoading };
};
export const useGetMessages = () => {
  const selectedChatId = useChatStore((state) => state.selectedChatId);
  const { data: allMessages, isLoading } = useQuery({
    queryFn: () => getMessages(selectedChatId),
    queryKey: ["allMessages", selectedChatId],
    enabled: !!selectedChatId,
  });
  return { allMessages, isLoading };
};

// const useSendMessage = () => {
//   const selectedChatId = useChatStore((state) => state.selectedChatId);
//   const { data: allMessages, isLoading } = useQuery({
//     queryFn: () => getMessages(selectedChatId),
//     queryKey: ["allMessages"],
//   });
//   return { allMessages, isLoading };
// };
