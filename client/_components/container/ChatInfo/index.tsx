import ButtonIcon from "@/_components/common/Icon/ButtonIcon";
import { useChatStore, useTabsStore, useUserStore } from "@/utils/stores";
import { IoClose } from "react-icons/io5";

import styles from "./index.module.css";
import Image from "next/image";
import UploadProfilePic from "@/_components/SVGs/UploadProfilePic";
import { Avatar } from "@mui/material";

const ChatInfo = () => {
  const setChatInfo = useTabsStore((state) => state.setChatInfo);
  const profilePic = useUserStore((state) => state.profilePic);
  const contact = useChatStore((state) => state.chatWith);
  return (
    <>
      <header className={styles.header}>
        <span>Contact info</span>
        <ButtonIcon
          title="Close"
          icon={<IoClose />}
          onClick={() => setChatInfo(false)}
        />
      </header>
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
    </>
  );
};

export default ChatInfo;
