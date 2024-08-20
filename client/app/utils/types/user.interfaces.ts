export interface CurrentUser {
  _id?: string;
  displayName?: string | undefined;
  email?: string;
  country?: string | undefined;
  profilePic?: any;
  city?: string | undefined;
  postalCode?: string | undefined;
  birthDate?: string | undefined;
  phoneNumber?: string | undefined;
  status?: string | undefined;
  friends?: [CurrentUser];
  friendRequestsSent?: [{ displayName: string; _id: string }] | undefined;
  friendRequestsReceived?: [{ displayName: string; _id: string }] | undefined;
  chats?: any;
}
