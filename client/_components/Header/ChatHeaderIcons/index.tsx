import { BsSearch, BsTelephone } from "react-icons/bs";
import ChatDropMenu from "../../common/Tabs/ChatDropMenu";
import ButtonIcon from "@/_components/common/Icon/ButtonIcon";

import styles from "./index.module.css";

const ChatHeaderIcons = () => {
  return (
    <div className={styles.chatHeaderIcons}>
      <ButtonIcon title="Search" icon={<BsSearch />} />
      <ButtonIcon title="Voice call" icon={<BsTelephone />} />
      <ChatDropMenu className={styles.chatDropMenu} />
    </div>
  );
};

export default ChatHeaderIcons;
