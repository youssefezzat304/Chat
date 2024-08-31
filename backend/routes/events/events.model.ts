import { prop, Ref } from "@typegoose/typegoose";
import { User } from "../user/user.model";
import { Types } from "mongoose";

export enum EventType {
  NEW_MEMBER = "new_member",
  GROUP_NAME_CHANGED = "group_name_changed",
  GROUP_PICTURE_CHANGED = "group_picture_changed",
  GROUP_DESCRIPTION_CHANGED = "group_description_changed",
}

export class EventLog {
  @prop({ type: () => Types.ObjectId, default: () => new Types.ObjectId() })
  public _id!: Types.ObjectId;

  @prop({ enum: EventType, required: true })
  public eventType!: EventType;

  @prop({ ref: () => User, required: true })
  public initiatedBy!: Ref<User>;

  @prop()
  public value?: string;

  @prop({ ref: () => User, default: null })
  public newMember?: Ref<User>;
}
