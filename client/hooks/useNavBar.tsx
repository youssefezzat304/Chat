import { useTabsStore } from "@/utils/stores";
import useTabletStore from "@/utils/stores/tablet.store";
import { useRouter } from "next/navigation";
import { useThemeContext } from "@/contexts/ThemeContext";

const useNavBar = () => {
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

  const setTabletNavBar = useTabletStore((state) => state.setTabletNavBar);
  const router = useRouter();
  const { setSystemLoading } = useThemeContext();

  const handleNotifications = () => {
    toggleNotifications("notificationsTab");
  };
  const handleFriendRequests = () => {
    toggleFriendRequests("friendRequestsTab");
  };
  const gotoChats = () => {
    setTabletNavBar(false);
    openChatsTab("chatsTab");
    router.replace("/dashboard");
  };
  const gotoContacts = () => {
    setTabletNavBar(false);
    openFriendsTab("friendsTab");
    router.replace("/dashboard");
  };
  const gotoProfileSettings = () => {
    setTabletNavBar(false);
    setSystemLoading(true);
    router.replace("/profile");
  };
  return {
    gotoChats,
    gotoContacts,
    gotoProfileSettings,
    handleNotifications,
    handleFriendRequests,
  };
};

export default useNavBar;
