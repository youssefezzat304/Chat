import { Panel } from "react-resizable-panels";
import ChatInfo from "../ChatInfo";

import styles from "./index.module.css";
import ButtonIcon from "@/_components/common/Icon/ButtonIcon";
import { IoClose } from "react-icons/io5";
import { useTabsStore } from "@/utils/stores";

const ChatInfoContainer = () => {
  const setChatInfo = useTabsStore((state) => state.setChatInfo);
  return (
    <Panel defaultSize={50} minSize={20} className={styles.chatInfoContainer}>
      <ButtonIcon
        title="Close"
        icon={<IoClose className="icon" />}
        onClick={() => setChatInfo(false)}
      />
      <ChatInfo />
    </Panel>
  );
};

export default ChatInfoContainer;
