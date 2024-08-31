import { prop, Ref } from "@typegoose/typegoose";
import { User } from "../user/user.model";
import { Types } from "mongoose";

enum FriendRequestStatus {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
}
export class FriendRequest {
  @prop({ type: () => Types.ObjectId, default: () => new Types.ObjectId() })
  public _id!: Types.ObjectId;

  @prop({ ref: () => User, required: true })
  public requester!: Ref<User>;

  @prop({ ref: () => User, required: true })
  public recipient!: Ref<User>;

  @prop({ required: true, enum: FriendRequestStatus })
  public status: string;
}
