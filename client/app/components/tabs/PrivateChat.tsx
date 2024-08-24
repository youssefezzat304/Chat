import { MessagesSystem } from "@/app/dashboard/MessagesSystem";
import { useChatStore } from "@/app/utils/stores";
import MessageInput from "../inputs/MessageInput";
import ChatHeader from "../headers/ChatHeader";

const PrivateChat = () => {
  const chatWith = useChatStore((state) => state.chatWith);

  return (
    <>
      <header className="chat-header">
        <div className="header-info">
          <label htmlFor="name">{chatWith?.displayName}</label>
          <p>Online</p>
        </div>
        <ChatHeader />
      </header>
      <section className="chat-console">
        <MessagesSystem />
      </section>
      <section className="chat-input">
        <MessageInput />
      </section>
    </>
  );
};

export default PrivateChat;
