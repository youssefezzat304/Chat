import { GroupChat, PrivateChat } from "./chat.types";

export interface User {
  _id: string;
  displayName: string;
  email: string;
  address: {
    country: string;
    city: string;
    postalCode: string;
  };
  profilePicture: string;
  birthDate: string;
  phoneNumber: string;
  status: string;
  friends: Array<User>;
  chats: Array<PrivateChat>;
  groupChats: Array<GroupChat>;
  onlineStatus: boolean;
  lastSeen: string;
  friendRequests: {
    incoming: Array<User>;
    outgoing: Array<User>;
  };
}
