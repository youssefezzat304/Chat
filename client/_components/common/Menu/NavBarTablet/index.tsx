import { IoNotifications, IoSettingsSharp } from "react-icons/io5";
import styles from "./index.module.css";
import { PiChatsFill } from "react-icons/pi";
import { RiContactsBook3Fill, RiLogoutCircleLine } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import AddFriendDialog from "../../Dialog/AddFriendDialog";
import NavBarTabletBtn from "../../Button/NavBarTabletBtn";
import UploadProfilePic from "@/_components/SVGs/UploadProfilePic";
import { DisplayImage } from "@/_components";
import { useTabsStore, useUserStore } from "@/utils/stores";
import { useRouter } from "next/navigation";
import { useThemeContext } from "@/contexts/ThemeContext";
import useTabletStore from "@/utils/stores/tablet.store";

const NavBarTablet = () => {
  // const router = useRouter();
  // const setUser = useUserStore((state) => state.setUser);
  const currentUser = useUserStore((state) => state.user);
  const profilePic = useUserStore((state) => state.profilePic);
  // const setTabletNavBar = useTabletStore((state) => state.setTabletNavBar);
  // const openChatsTab = useTabsStore((state) => state.openChatsTab);
  // const openFriendsTab = useTabsStore((state) => state.openFriendsTab);

  // const handelNotificationsTab = useTabsStore(
  //   (state) => state.handleNotificationsTab
  // );
  // const handelFriendRequestsTab = useTabsStore(
  //   (state) => state.handleFriendRequestsTab
  // );

  // const { setSystemLoading } = useThemeContext();

  // const gotoChats = () => {
  //   setTabletNavBar(false);
  //   openChatsTab();
  //   router.replace("/dashboard");
  // };
  // const gotoFriends = () => {
  //   setTabletNavBar(false);
  //   openFriendsTab();
  //   router.replace("/dashboard");
  // };
  // const gotoProfileSettings = () => {
  //   setTabletNavBar(false);
  //   setSystemLoading(true);
  //   router.replace("/profile");
  // };
  return (
    <main className={styles.main}>
      <div className={styles.profileContainer} >
        {profilePic === "" ? (
          <div className={styles.profilePicture}>
            <UploadProfilePic />
          </div>
        ) : (
          <DisplayImage
            className={styles.profilePicture}
            base64String={profilePic}
          />
        )}
        <strong>{currentUser?.displayName}</strong>
      </div>
      <section className={styles.buttons}>
        <NavBarTabletBtn
          divProps={{ className: styles.button }}
          buttonProps={{ title: "Notifications" }}
          icon={<IoNotifications className={styles.sideIcon} />}
        />
        <NavBarTabletBtn
          divProps={{ className: styles.button }}
          buttonProps={{ title: "Chats" }}
          icon={<PiChatsFill className={styles.sideIcon} />}

        />
        <NavBarTabletBtn
          divProps={{ className: styles.button }}
          buttonProps={{ title: "Contacts" }}
          icon={<RiContactsBook3Fill className={styles.sideIcon} />}

        />
        <NavBarTabletBtn
          divProps={{ className: styles.button }}
          buttonProps={{ title: "Friend requests" }}
          icon={<FaUserFriends className={styles.sideIcon} />}
        />
        <AddFriendDialog />
        <NavBarTabletBtn
          divProps={{ className: styles.button }}
          buttonProps={{ title: "Settings" }}
          icon={<IoSettingsSharp className={styles.sideIcon} />}
        />
        <NavBarTabletBtn
          divProps={{ className: styles.logoutBtn }}
          buttonProps={{ title: "Log-out" }}
          icon={<RiLogoutCircleLine className={styles.logoutIcon} />}
        />
      </section>
    </main>
  );
};

export default NavBarTablet;
