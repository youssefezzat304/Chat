"use client";
import { useRouter } from "next/navigation";
import DisplayImage from "../others/DisplayImage";
import UploadProfilePic from "../SVGs/UploadProfilePic";
import AddFriendDialog from "../dialogs/AddFriendDialog";
import { useThemeContext } from "@/app/contexts/ThemeContext";
import useAxiosPrivate from "@/app/hooks/useAxiosPrivate";
import { useQueryClient } from "@tanstack/react-query";
import SideButton from "./SideButton";
import { useUserStore, useAuthStore, useTabsStore } from "@/app/utils/stores";

import { IoNotifications, IoSettingsSharp } from "react-icons/io5";
import { RiContactsBook3Fill, RiLogoutCircleLine } from "react-icons/ri";
import { PiChatsFill } from "react-icons/pi";
import { FaUserFriends } from "react-icons/fa";

const SideBarButtons = () => {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { setUser, profilePic } = useUserStore();
  const { openFriendsTab, openChatsTab } = useTabsStore();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const handelNotificationsTab = useTabsStore(
    (state) => state.handleNotificationsTab
  );
  const handelFriendRequestsTab = useTabsStore(
    (state) => state.handleFriendRequestsTab
  );

  const handleLogOut = async () => {
    localStorage.removeItem("currentUser");
    queryClient.removeQueries({ queryKey: ["currentUser"], exact: true });
    setAccessToken(null);
    setUser(null);
    try {
      await axiosPrivate.get("/users/logout", {
        withCredentials: true,
      });
    } catch (error: any) {
      console.log(error);
    } finally {
      router.replace("/register");
    }
  };
  const { setSystemLoading } = useThemeContext();

  const gotoChats = () => {
      openChatsTab();
      router.replace("/dashboard");
    },
    gotoProfileSettings = () => {
      setSystemLoading(true);
      router.replace("/profile");
    },
    consolee = () => {
      console.log("nothing");
    };

  return (
    <main className="sidebar-icons">
      <div className="profile" onClick={gotoProfileSettings}>
        {profilePic === "" ? (
          <div className="pp-container">
            <UploadProfilePic />
          </div>
        ) : (
          <DisplayImage className="pp-container" base64String={profilePic} />
        )}
      </div>
      <section className="icons-section">
        <SideButton
          icon={<IoNotifications className="side-icon" />}
          title="Notifications"
          onClick={handelNotificationsTab}
        />
        <SideButton
          icon={<PiChatsFill className="side-icon" />}
          title="Chats"
          onClick={gotoChats}
        />
        <SideButton
          icon={<RiContactsBook3Fill className="side-icon" />}
          title="Contacts"
          onClick={openFriendsTab}
        />
        <SideButton
          icon={<FaUserFriends className="side-icon" />}
          title="Friend requests"
          onClick={handelFriendRequestsTab}
        />
        <AddFriendDialog />
      </section>
      <section className="icons-section">
        <SideButton
          icon={<IoSettingsSharp className="side-icon" />}
          title="Settings"
        />
        <button
          className="logout-Btn side-Btn"
          type="button"
          title="Log-out"
          onClick={handleLogOut}
        >
          <RiLogoutCircleLine className="logout-icon" />
          Log out
        </button>
      </section>
    </main>
  );
};

export default SideBarButtons;
