import { ChatInfo } from "./chat.interfaces";
export interface User {
  _id: string;
  displayName: string;
  email: string;
  country: string;
  profilePic: string;
  city: string;
  postalCode: string;
  birthDate: string;
  phoneNumber: string;
  status: string;
  friends: [User];
  friendRequestsSent: [{ displayName: string; _id: string }];
  friendRequestsReceived: [{ displayName: string; _id: string }];
  chats: ChatInfo[];
}
