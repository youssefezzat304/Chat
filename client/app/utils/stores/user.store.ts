import { create } from "zustand";
import { CurrentUser } from "../types/user.interfaces";

type UserStore = {
  user: CurrentUser | null;
  setUser: (userState: CurrentUser | null | undefined) => void;
  profilePic: any;
  setProfilePic: (profilePicState: any) => void;
  ppFile: any;
  setPpFile: (ppFileState: any) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (userState) => {
    set({ user: userState });
  },
  profilePic: null,
  setProfilePic: (profilePicState) => {
    set({ profilePic: profilePicState });
  },
  ppFile: null,
  setPpFile: (ppFileState) => {
    set({ ppFile: ppFileState });
  },
}));
