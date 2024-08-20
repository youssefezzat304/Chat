import {
  prop,
  Ref,
} from "@typegoose/typegoose";
import { User } from "../user/user.model";

enum FriendRequestStatus {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
}
export class FriendRequest {
  @prop({ ref: () => User, required: true })
  public requester!: Ref<User>;

  @prop({ ref: () => User, required: true })
  public recipient!: Ref<User>;

  @prop({ required: true, enum: FriendRequestStatus })
  public status: string;
}
