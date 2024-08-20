"use client";
import { useRouter } from "next/navigation";
import { FaUserFriends } from "react-icons/fa";
import { IoNotifications, IoSettingsSharp } from "react-icons/io5";
import { PiChatsFill } from "react-icons/pi";
import { RiContactsBook3Fill, RiLogoutCircleLine } from "react-icons/ri";
import UploadProfilePic from "@/app/SVGs/UploadProfilePic";
import AddFriendDialog from "@/app/dialogs/AddFriendDialog";
import { useThemeContext } from "@/app/contexts/ThemeContext";
import { useUserStore } from "@/app/utils/stores/user.store";
import useAxiosPrivate from "@/app/hooks/useAxiosPrivate";
import { useAuthStore } from "@/app/utils/stores/auth.store";
import { useQueryClient } from "@tanstack/react-query";
import DisplayImage from "../others/DisplayImage";
import { useOpenTabsStore } from "@/app/utils/stores/handleTabs.store";

type SideBarButtonsProps = {
  handelNotificationsTab?: () => void;
  handelFriendRequestsTab?: () => void;
};
const SideBarButtons = () => {
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();
  const queryClient = useQueryClient();
  const setCurrentUser = useUserStore((state) => state.setUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const profilePic = useUserStore((state) => state.profilePic);
  const handleFriendsTab = useOpenTabsStore((state) => state.openFriendsTab);
  const handleChatsTab = useOpenTabsStore((state) => state.openChatsTab);

  const handelNotificationsTab = useOpenTabsStore(
    (state) => state.handleNotificationsTab
  );
  const handelFriendRequestsTab = useOpenTabsStore(
    (state) => state.handleFriendRequestsTab
  );

  const handleLogOut = async () => {
    localStorage.removeItem("currentUser");
    queryClient.removeQueries({ queryKey: ["currentUser"], exact: true });
    setAccessToken(null);
    setCurrentUser(null);
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
      handleChatsTab();
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
        <button
          className="side-Btn"
          type="button"
          title="Chats"
          onClick={handelNotificationsTab}
        >
          <IoNotifications className="side-icon" />
          Notifications
        </button>
        <button
          className="side-Btn"
          type="button"
          title="Chats"
          onClick={gotoChats}
        >
          <PiChatsFill className="side-icon" />
          Chats
        </button>
        <button
          className="side-Btn"
          type="button"
          title="Contacts"
          onClick={handleFriendsTab}
        >
          <RiContactsBook3Fill className="side-icon" />
          Contacts
        </button>
        <button
          className="side-Btn"
          type="button"
          title="Friend requests"
          onClick={handelFriendRequestsTab}
        >
          <FaUserFriends className="side-icon" />
          Friend requests
        </button>
        <AddFriendDialog />
      </section>
      <section className="icons-section">
        <button className="side-Btn" type="button" title="Settings">
          <IoSettingsSharp className="side-icon" />
          Settings
        </button>
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
