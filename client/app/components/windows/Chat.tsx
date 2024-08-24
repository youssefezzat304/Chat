import { useChatStore } from "@/app/utils/stores";
import NoMessages from "./NoMessages";
import PrivateChat from "./PrivateChat";

const Chat = () => {
  const chatWith = useChatStore((state) => state.chatWith);
  return (
    <main className="chat-main">
      {!chatWith ? <NoMessages /> : <PrivateChat />}
    </main>
  );
};

export default Chat;
