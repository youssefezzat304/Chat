import { MessagesSystem } from "@/app/dashboard/MessagesSystem";
import { useChatStore } from "@/utils/stores";
import MessageInput from "../../common/Input/MessageInput";
import ChatHeader from "../../Header/ChatHeader";

import styles from "./index.module.css";

const PrivateChat = () => {
  const chatWith = useChatStore((state) => state.chatWith);

  return (
    <>
      <header className={styles.chatHeader}>
        <div className="header-info">
          <label htmlFor="name">{chatWith?.displayName}</label>
          <p>Online</p>
        </div>
        <ChatHeader />
      </header>
      <section className={styles.chatConsole}>
        <MessagesSystem />
      </section>
      <section className={styles.chatInput}>
        <MessageInput />
      </section>
    </>
  );
};

export default PrivateChat;
