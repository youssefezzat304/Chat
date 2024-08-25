import { BsSearch, BsTelephone } from "react-icons/bs";
import ChatDropMenu from "../../common/Tabs/ChatDropMenu";
import ButtonIcon from "@/_components/common/Icon/ButtonIcon";

import styles from "./index.module.css";

const ChatHeader = () => {
  return (
    <main className={styles.chatHeaderIcons}>
      <ButtonIcon title="Search" icon={<BsSearch />} />
      <ButtonIcon title="Voice call" icon={<BsTelephone />} />
      <ChatDropMenu />
    </main>
  );
};

export default ChatHeader;
