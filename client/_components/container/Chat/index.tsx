import { useChatStore } from "@/utils/stores";
import NoMessages from "../../common/Tabs/NoMessages";
import PrivateChat from "../PrivateChat";

import styles from "./index.module.css";

const Chat = () => {
  const chatWith = useChatStore((state) => state.chatWith);
  return (
    <main className={styles.chatMain}>
      {!chatWith ? <NoMessages /> : <PrivateChat />}
    </main>
  );
};

export default Chat;
