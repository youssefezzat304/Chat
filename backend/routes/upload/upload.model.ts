import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "../user/user.model";
import { Types } from "mongoose";

export class UploadFile {
  @prop({ type: () => Types.ObjectId, default: () => new Types.ObjectId() })
  public _id!: Types.ObjectId;

  @prop({ ref: () => User, required: true })
  public requester!: Ref<User>;

  @prop({ ref: () => User, required: false })
  public recipient?: Ref<User>;

  @prop()
  fieldname: string;

  @prop()
  originalname: string;

  @prop()
  encoding: string;

  @prop()
  destination: string;

  @prop()
  filename: string;

  @prop()
  path: string;

  @prop()
  size: number;

  @prop()
  public mimetype: string;
}
