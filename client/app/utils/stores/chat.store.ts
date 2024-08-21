import { create } from "zustand";
import { ChatInfo, MessageInterface } from "../types/chat.interfaces";
import { User } from "../types/user.interfaces";

type ChatStore = {
  selectedChatId: string;
  setSelectedChatId: (selectedChatIdState: string) => void;
  chatInfo: ChatInfo | undefined;
  setChatInfo: (chatInfoState: ChatInfo | undefined) => void;
  recentChats: ChatInfo[];
  setRecentChats: (recentChatsState: ChatInfo[]) => void;
  chatWith?: User;
  setChatWith: (chatWithState: User) => void;
  messages: MessageInterface[];
  setMessages: (messagesState: MessageInterface[]) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  selectedChatId: "",
  chatInfo: undefined,
  recentChats: [],
  chatWith: undefined,
  messages: [],
  setSelectedChatId: (selectedChatIdState) => {
    set({ selectedChatId: selectedChatIdState });
  },
  setChatInfo: (chatInfoState) => {
    set({ chatInfo: chatInfoState });
  },
  setRecentChats: (recentChatsState) => {
    set({ recentChats: recentChatsState });
  },
  setChatWith: (chatWithState) => {
    set({ chatWith: chatWithState });
  },
  setMessages: (messagesState) => {
    set({ messages: messagesState });
  },
}));
