import { findChat, getAllChats } from "@/app/api/chat.api";
import { useChatStore, useUserStore } from "../stores";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/app/api/messages.api";
import { useEffect } from "react";

export const useGetChats = () => {
  const currentUser = useUserStore((state) => state.user);
  const { data: allChats, isLoading } = useQuery({
    queryFn: () => getAllChats(currentUser?._id),
    queryKey: ["allChats"],
  });
  return { allChats, isLoading };
};
// export const useFindChat = () => {
//   const currentUser = useUserStore((state) => state.user);
//   const chatWith = useChatStore((state) => state.chatWith);
//   const setSelectedChatId = useChatStore((state) => state.setSelectedChatId);
//   const { data: currentChat, isLoading } = useQuery({
//     queryFn: () =>
//       findChat({ userId: currentUser?._id, chatterId: chatWith?._id }),
//     queryKey: ["currentChat", chatWith],
//     enabled: !!chatWith,
//   });
//   useEffect(() => {
//     if (allMessages) {
//       setMessages(allMessages.data);
//     }
//   }, [allMessages, setMessages]);
//   if (currentChat) {
//     setSelectedChatId(currentChat.data._id);
//   }
//   return { currentChat, isLoading };
// };
export const useGetMessages = () => {
  const setMessages = useChatStore((state) => state.setMessages);
  const chatWith = useChatStore((state) => state.chatWith);
  const user = useUserStore((state) => state.user);

  const { data: allMessages, isLoading } = useQuery({
    queryFn: () => getMessages({ userId: user?._id, chatterId: chatWith?._id }),
    queryKey: ["allMessages", chatWith],
    enabled: !!chatWith,
  });

  useEffect(() => {
    if (allMessages) {
      setMessages(allMessages.data);
    }
  }, [allMessages, setMessages]);

  return { allMessages, isLoading };
};
