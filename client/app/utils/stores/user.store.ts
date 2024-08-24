import { create } from "zustand";
import { User } from "../types/user.interfaces";

type UserStore = {
  user: User | null;
  setUser: (userState: User | null | undefined) => void;
  profilePic: any;
  setProfilePic: (profilePicState: any) => void;
  ppFile: any;
  setPpFile: (ppFileState: any) => void;
};

const useUserStore = create<UserStore>((set) => ({
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

export default useUserStore
