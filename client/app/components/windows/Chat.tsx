import { useChatStore } from "@/app/utils/stores/chat.store";
import NoMessages from "./NoMessages";
import PrivateChat from "./PrivateChat";

const Chat = () => {
  const selectedChatId = useChatStore((state) => state.selectedChatId);
  return (
    <main className="chat-main">
      {selectedChatId === "" ? <NoMessages /> : <PrivateChat />}
    </main>
  );
};

export default Chat;
