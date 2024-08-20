import { create } from "zustand";
import { ChatInfo } from "../types/chat.interfaces";

type ChatStore = {
  selectedChatId: string;
  setSelectedChatId: (selectedChatIdState: string) => void;
  chatInfo: ChatInfo | undefined;
  setChatInfo: (chatInfoState: ChatInfo | undefined) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  selectedChatId: "",
  chatInfo: undefined,
  setSelectedChatId: (selectedChatIdState) => {
    set({ selectedChatId: selectedChatIdState });
  },
  setChatInfo: (chatInfoState) => {
    set({ chatInfo: chatInfoState });
  },
}));
