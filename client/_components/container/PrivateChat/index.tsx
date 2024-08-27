import { MessagesSystem } from "@/app/dashboard/MessagesSystem";
import { useChatStore } from "@/utils/stores";
import MessageInput from "../../common/Input/MessageInput";
import ChatHeaderIcons from "../../Header/ChatHeaderIcons";
import BackBtn from "@/_components/common/Button/BackBtn";
import useIsMobile from "@/hooks/MediaQuery/useIsMobile";
import Chats from "@/_components/List/Chats";
import useMobileStore from "@/utils/stores/mobile.store";

import styles from "./index.module.css";

const PrivateChat = () => {
  const { isMobile } = useIsMobile();
  const chatWith = useChatStore((state) => state.chatWith);
  const mobileChats = useMobileStore((state) => state.mobileChats);
  const setMobileChats = useMobileStore((state) => state.setMobileChats);

  const backToChats = () => {
    setMobileChats(true);
  };
  return (
    <>
      {mobileChats && isMobile ? (
        <Chats />
      ) : (
        <>
          <header className={styles.chatHeader}>
            {isMobile && (
              <BackBtn onClick={backToChats} className={styles.backBtn} />
            )}
            <div className={styles.headerInfo}>
              <label htmlFor="name">{chatWith?.displayName}</label>
              <p>Online</p>
            </div>
            <ChatHeaderIcons />
          </header>
          <section className={styles.chatConsole}>
            <MessagesSystem />
          </section>
          <section className={styles.chatInput}>
            <MessageInput />
          </section>
        </>
      )}
    </>
  );
};

export default PrivateChat;
