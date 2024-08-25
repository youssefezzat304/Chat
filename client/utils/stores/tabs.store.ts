import { create } from "zustand";

type OpenTabsStore = {
  notificationsTab: boolean;
  handleNotificationsTab: () => void;
  openNotificationsTab: () => void;
  friendRequestsTab: boolean;
  handleFriendRequestsTab: () => void;
  openFriendRequestsTab: () => void;
  friendsTab: boolean;
  chatsTab: boolean;
  openFriendsTab: () => void;
  openChatsTab: () => void;
  chatInfoTab: boolean;
  setChatInfo: (state: boolean) => void;
  membersTab: boolean;
  setMembersTab: (state: boolean) => void;
  closeNotifications: () => void;
};

const useTabsStore = create<OpenTabsStore>((set) => ({
  notificationsTab: false,
  friendRequestsTab: false,
  friendsTab: false,
  chatsTab: true,
  chatInfoTab: false,
  membersTab: false,
  handleNotificationsTab: () => {
    set((state) => ({
      friendRequestsTab: false,
      notificationsTab: !state.notificationsTab,
    }));
  },
  openNotificationsTab: () => {
    set({ notificationsTab: true, friendRequestsTab: false });
  },
  handleFriendRequestsTab: () => {
    set((state) => ({
      notificationsTab: false,
      friendRequestsTab: !state.friendRequestsTab,
    }));
  },
  openFriendRequestsTab: () => {
    set({
      friendRequestsTab: true,
      notificationsTab: false,
    });
  },
  openFriendsTab: () => {
    set({
      friendsTab: true,
      chatsTab: false,
    });
  },
  openChatsTab: () => {
    set({ chatsTab: true, friendsTab: false });
  },
  setChatInfo: (state) => {
    set({ chatInfoTab: state });
  },
  setMembersTab: (state) => {
    set({ membersTab: state });
  },
  closeNotifications: () => {
    set({ notificationsTab: false, friendRequestsTab: false });
  },
}));

export default useTabsStore;
