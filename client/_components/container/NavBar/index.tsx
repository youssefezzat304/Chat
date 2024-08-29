"use client";
import AddFriendDialog from "../../common/Dialog/AddFriendDialog";
import { useUserStore } from "@/utils/stores";
import { IoNotifications, IoSettingsSharp } from "react-icons/io5";
import { RiContactsBook3Fill, RiLogoutCircleLine } from "react-icons/ri";
import { PiChatsFill } from "react-icons/pi";
import { FaUserFriends } from "react-icons/fa";
import NavBarBtn from "@/_components/common/Button/NavBarBtn";
import useLogOut from "@/hooks/useLogOut";
import useNavBar from "@/hooks/useNavBar";
import { Avatar } from "@mui/material";

import styles from "./index.module.css";

const NavBar = () => {
  const {
    gotoChats,
    gotoContacts,
    gotoProfileSettings,
    handleFriendRequests,
    handleNotifications,
  } = useNavBar();
  const profilePic = useUserStore((state) => state.profilePic);
  const { handleLogOut } = useLogOut();

  return (
    <main className={styles.navBar}>
      <div className={styles.profile} onClick={gotoProfileSettings}>
        <Avatar
          src={profilePic}
          className={styles.placeholder}
          sx={{ width: "3.3rem", height: "3.3rem" }}
        />
      </div>
      <section className={styles.icons}>
        <NavBarBtn
          icon={<IoNotifications className={styles.sideIcon} />}
          title="Alerts"
          onClick={handleNotifications}
        />
        <NavBarBtn
          icon={<PiChatsFill className={styles.sideIcon} />}
          title="Chats"
          onClick={gotoChats}
        />
        <NavBarBtn
          icon={<RiContactsBook3Fill className={styles.sideIcon} />}
          title="Contacts"
          onClick={gotoContacts}
        />
        <NavBarBtn
          icon={<FaUserFriends className={styles.sideIcon} />}
          title="Friend requests"
          onClick={handleFriendRequests}
        />
        <AddFriendDialog />
      </section>
      <section className={styles.icons}>
        <NavBarBtn
          icon={<IoSettingsSharp className={styles.sideIcon} />}
          title="Settings"
        />
        <button
          className={`${styles.logoutBtn} ${styles.sideBtn}`}
          type="button"
          title="Log-out"
          onClick={handleLogOut}
        >
          <RiLogoutCircleLine className={styles.logoutIcon} />
          Log out
        </button>
      </section>
    </main>
  );
};

export default NavBar;
