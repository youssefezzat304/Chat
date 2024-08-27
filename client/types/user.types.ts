import { ChatInfo } from "./chat.types";

export interface User {
  _id: string;
  displayName: string;
  email: string;
  address: {
    country: string;
    city: string;
    postalCode: string;
  };
  profilePic: string;
  birthDate: string;
  phoneNumber: string;
  status: string;
  chats: Array<ChatInfo>;
  friends: Array<User>;
  friendRequestsSent: Array<{ displayName: string; _id: string }>;
  friendRequestsReceived: Array<{ displayName: string; _id: string }>;
}
