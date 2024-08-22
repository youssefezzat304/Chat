import { prop, Ref } from "@typegoose/typegoose";
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
  public fieldname: string;

  @prop()
  public originalname: string;

  @prop()
  public encoding: string;

  @prop()
  public destination: string;

  @prop()
  public filename: string;

  @prop()
  public path: string;

  @prop()
  public size: number;

  @prop()
  public mimetype: string;
}
