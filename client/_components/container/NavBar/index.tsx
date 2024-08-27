"use client";
import { useRouter } from "next/navigation";
import DisplayImage from "../../common/Display/ImageDisplay";
import UploadProfilePic from "../../SVGs/UploadProfilePic";
import AddFriendDialog from "../../common/Dialog/AddFriendDialog";
import { useThemeContext } from "@/contexts/ThemeContext";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore, useAuthStore, useTabsStore } from "@/utils/stores";
import { IoNotifications, IoSettingsSharp } from "react-icons/io5";
import { RiContactsBook3Fill, RiLogoutCircleLine } from "react-icons/ri";
import { PiChatsFill } from "react-icons/pi";
import { FaUserFriends } from "react-icons/fa";
import NavBarBtn from "@/_components/common/Button/NavBarBtn";

import styles from "./index.module.css";

const NavBar = () => {
  const {
    openChatsTab,
    openFriendsTab,
    toggleNotifications,
    toggleFriendRequests,
  } = useTabsStore((state) => ({
    openChatsTab: state.openTab,
    openFriendsTab: state.openTab,
    toggleNotifications: state.toggleTab,
    toggleFriendRequests: state.toggleTab,
  }));

  const { setUser, profilePic } = useUserStore((state) => ({
    setUser: state.setUser,
    profilePic: state.profilePic,
  }));

  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const { setSystemLoading } = useThemeContext();

  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const handleLogOut = async () => {
    localStorage.removeItem("currentUser");
    queryClient.removeQueries({ queryKey: ["currentUser"], exact: true });
    setAccessToken(null);
    setUser(null);
    try {
      await axiosPrivate.get("/users/logout", {
        withCredentials: true,
      });
      router.replace("/register");
    } catch (error: any) {
      console.log(error);
    } finally {
      router.replace("/register");
    }
  };

  const gotoChats = () => {
    openChatsTab("chatsTab");
    router.replace("/dashboard");
  };
  const gotoProfileSettings = () => {
    setSystemLoading(true);
    router.replace("/profile");
  };
  const consolee = () => {
    console.log("nothing");
  };

  return (
    <main className={styles.sidebarIcons}>
      <div className={styles.profile} onClick={gotoProfileSettings}>
        {profilePic === "" ? (
          <div className={styles.ppContainer}>
            <UploadProfilePic />
          </div>
        ) : (
          <DisplayImage
            className={styles.ppContainer}
            base64String={profilePic}
          />
        )}
      </div>
      <section className={styles.iconsSection}>
        <NavBarBtn
          icon={<IoNotifications className={styles.sideIcon} />}
          title="Notifications"
          onClick={() => toggleNotifications("notificationsTab")}
        />
        <NavBarBtn
          icon={<PiChatsFill className={styles.sideIcon} />}
          title="Chats"
          onClick={gotoChats}
        />
        <NavBarBtn
          icon={<RiContactsBook3Fill className={styles.sideIcon} />}
          title="Contacts"
          onClick={() => openFriendsTab("friendsTab")}
        />
        <NavBarBtn
          icon={<FaUserFriends className={styles.sideIcon} />}
          title="Friend requests"
          onClick={() => toggleFriendRequests("friendRequestsTab")}
        />
        <AddFriendDialog />
      </section>
      <section className={styles.iconsSection}>
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
