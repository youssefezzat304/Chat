import { create } from "zustand";

type ChatStore = {
  selectedChatId: string;
  setSelectedChatId: (selectedChatIdState: string) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  selectedChatId: "",
  setSelectedChatId: (selectedChatIdState) => {
    set({ selectedChatId: selectedChatIdState });
  },
}));
