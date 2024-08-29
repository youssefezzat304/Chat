import { Panel } from "react-resizable-panels";
import ButtonIcon from "@/_components/common/Icon/ButtonIcon";
import { IoClose } from "react-icons/io5";
import { Avatar } from "@mui/material";
import ChatInfoUtilities from "../ChatInfo/ChatInfoUtilities.tsx";
import { useChatStore, useTabsStore, useUserStore } from "@/utils/stores";
import Image from "next/image";

import styles from "./index.module.css";

const ChatInfoContainer = () => {
  const setChatInfo = useTabsStore((state) => state.setChatInfo);
  const profilePic = useUserStore((state) => state.profilePic);
  const contact = useChatStore((state) => state.chatWith);

  return (
    <Panel defaultSize={50} minSize={20} className={styles.chatInfoContainer}>
      <header className={styles.header}>
        <span>Contact info</span>
        <ButtonIcon
          title="Close"
          icon={<IoClose />}
          onClick={() => setChatInfo(false)}
        />
      </header>
      <div className={styles.body}>
        <section className={styles.profile}>
          {profilePic === "" ? (
            <Avatar sx={{ width: "12rem", height: "12rem" }} />
          ) : (
            <Image
              className={styles.profilePicture}
              src={profilePic}
              alt="Contact profile picture"
            />
          )}
          <span>{contact?.displayName}</span>
        </section>
        <ChatInfoUtilities />
      </div>
    </Panel>
  );
};

export default ChatInfoContainer;
