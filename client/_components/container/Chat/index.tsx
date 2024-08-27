import { useChatStore } from "@/utils/stores";
import NoMessages from "../../common/Tabs/NoMessages";
import PrivateChat from "../PrivateChat";
import useMediaQuery from "@/hooks/useMediaQuery";

import styles from "./index.module.css";
import Chats from "@/_components/List/Chats";

const Chat = () => {
  const chatWith = useChatStore((state) => state.chatWith);
  const { isMobile, isSmallTab } = useMediaQuery();
  const largeScreen = !isMobile && !isSmallTab;
  return (
    <main className={styles.chatMain}>
      {!chatWith && largeScreen ? (
        <NoMessages />
      ) : !chatWith && !largeScreen ? (
        <Chats />
      ) : (
        <PrivateChat />
      )}
    </main>
  );
};

export default Chat;
