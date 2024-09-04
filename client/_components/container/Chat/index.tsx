import { useChatStore } from "@/utils/stores";
import PrivateChat from "../PrivateChat";
import useMediaQuery from "@/hooks/useMediaQuery";

import styles from "./index.module.css";
import Chats from "@/_components/List/Chats";

const Chat = () => {
  const chatWith = useChatStore((state) => state.chatWith);
  const { isMobile, isSmallTab } = useMediaQuery();
  const largeScreen = !isMobile && !isSmallTab;

  const NoMessages = () => {
    return (
      <div className={styles.noMessages}>
        <strong>No new messages.</strong>
        <p>Start new conversation.</p>
      </div>
    );
  };
  return (
    <div className={styles.chatMain}>
      {!chatWith && largeScreen ? (
        <NoMessages />
      ) : !chatWith && !largeScreen ? (
        <Chats />
      ) : (
        <PrivateChat />
      )}
    </div>
  );
};

export default Chat;
