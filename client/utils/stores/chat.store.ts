import { create } from "zustand";
import { ChatInfo, MessageInterface } from "../../types/chat.types";
import { User } from "../../types/user.types";

type ChatStore = {
  selectedChatId: string;
  chatInfo?: ChatInfo;
  recentChats: ChatInfo[];
  chatWith?: User;
  messages: MessageInterface[];
  setSelectedChatId: (state: string) => void;
  setChatInfo: (state?: ChatInfo) => void;
  setRecentChats: (state: ChatInfo[]) => void;
  setChatWith: (state: User) => void;
  setMessages: (state: MessageInterface[]) => void;
  addMessage: (newMessage: MessageInterface) => void;
};

const useChatStore = create<ChatStore>((set) => ({
  selectedChatId: "",
  chatInfo: undefined,
  recentChats: [],
  chatWith: undefined,
  messages: [],

  setSelectedChatId: (state) => set({ selectedChatId: state }),

  setChatInfo: (state) => set({ chatInfo: state }),

  setRecentChats: (state) => set({ recentChats: state }),

  setChatWith: (state) => set({ chatWith: state }),

  setMessages: (state) => set({ messages: state }),

  addMessage: (newMessage) =>
    set((state) => ({
      messages: [...state.messages, newMessage],
    })),
}));

export default useChatStore;
