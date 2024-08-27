import { IoNotifications, IoSettingsSharp } from "react-icons/io5";
import { PiChatsFill } from "react-icons/pi";
import { RiContactsBook3Fill, RiLogoutCircleLine } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import AddFriendDialog from "../../Dialog/AddFriendDialog";
import NavBarTabletBtn from "../../Button/NavBarTabletBtn";
import UploadProfilePic from "@/_components/SVGs/UploadProfilePic";
import { DisplayImage } from "@/_components";
import useLogOut from "@/hooks/useLogOut";
import useNavBar from "@/hooks/useNavBar";
import { useUserStore } from "@/utils/stores";

import styles from "./index.module.css";

const NavBarTablet = () => {
  const {
    gotoChats,
    gotoContacts,
    gotoProfileSettings,
    handleFriendRequests,
    handleNotifications,
  } = useNavBar();
  const { profilePic, currentUser } = useUserStore((state) => ({
    profilePic: state.profilePic,
    currentUser: state.user,
  }));
  const { handleLogOut } = useLogOut();

  return (
    <main className={styles.main}>
      <div className={styles.profileContainer} onClick={gotoProfileSettings}>
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
          action={handleNotifications}
        />
        <NavBarTabletBtn
          divProps={{ className: styles.button }}
          buttonProps={{ title: "Chats" }}
          icon={<PiChatsFill className={styles.sideIcon} />}
          action={gotoChats}
        />
        <NavBarTabletBtn
          divProps={{ className: styles.button }}
          buttonProps={{ title: "Contacts" }}
          icon={<RiContactsBook3Fill className={styles.sideIcon} />}
          action={gotoContacts}
        />
        <NavBarTabletBtn
          divProps={{ className: styles.button }}
          buttonProps={{ title: "Friend requests" }}
          icon={<FaUserFriends className={styles.sideIcon} />}
          action={handleFriendRequests}
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
          action={handleLogOut}
        />
      </section>
    </main>
  );
};

export default NavBarTablet;
