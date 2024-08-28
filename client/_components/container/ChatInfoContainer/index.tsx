import { Panel } from "react-resizable-panels";
import ChatInfo from "../ChatInfo";

import styles from "./index.module.css";

const ChatInfoContainer = () => {
  return (
    <Panel defaultSize={50} minSize={20} className={styles.chatInfoContainer}>
      <ChatInfo />
    </Panel>
  );
};

export default ChatInfoContainer;
