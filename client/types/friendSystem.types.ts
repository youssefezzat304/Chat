export type FriendRequestState =
  | "success"
  | "error"
  | "warning"
  | "info"
  | null;

export interface FriendRequestType {
  recipientId?: string;
  requesterId?: string;
  status: "accepted" | "rejected";
}
