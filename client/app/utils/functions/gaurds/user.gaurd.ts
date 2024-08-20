import { CurrentUser } from "../../types/user.interfaces";

export const isCurrentUser = (obj: any): obj is CurrentUser => {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj._id === "string" &&
    typeof obj.displayName === "string" &&
    typeof obj.email === "string" &&
    typeof obj.country === "string" &&
    obj.profilePic !== undefined &&
    typeof obj.city === "string" &&
    typeof obj.postalCode === "string" &&
    typeof obj.birthDate === "string" &&
    typeof obj.phoneNumber === "string" &&
    typeof obj.status === "string" &&
    Array.isArray(obj.friends) &&
    obj.friends.every((friend: any) => isCurrentUser(friend)) &&
    Array.isArray(obj.friendRequestsSent) &&
    obj.friendRequestsSent.every((req: any) => isFriendRequest(req)) &&
    Array.isArray(obj.friendRequestsReceived) &&
    obj.friendRequestsReceived.every((req: any) => isFriendRequest(req)) &&
    obj.chats !== undefined
  );
};

export const isFriendRequest = (
  obj: any
): obj is { displayName: string; _id: string } => {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.displayName === "string" &&
    typeof obj._id === "string"
  );
};
