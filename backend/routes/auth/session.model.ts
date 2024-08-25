import {  prop, Ref } from "@typegoose/typegoose";
import { User } from "../user/user.model";
import { Types } from "mongoose";

export class Session {
  @prop({ type: () => Types.ObjectId, default: () => new Types.ObjectId() })
  public _id!: Types.ObjectId;

  @prop({ ref: () => User })
  user: Ref<User>;

  @prop()
  token: string;

  @prop({ default: true })
  valid: boolean;
}
