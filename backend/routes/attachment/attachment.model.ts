import { prop, Ref } from "@typegoose/typegoose";
import { User } from "../user/user.model";
import { Types } from "mongoose";
import { PrivateChat } from "../privateChat/privateChat.model";

export class Attachment {
  @prop({ type: () => Types.ObjectId, default: () => new Types.ObjectId() })
  public _id!: Types.ObjectId;

  @prop({ ref: () => User, required: true })
  public uploader!: Ref<User>;

  @prop({ ref: () => PrivateChat, required: false })
  public chat?: Ref<PrivateChat>;

  @prop({ required: true, enum: ["image", "video", "document", "voice"] })
  public type!: "image" | "video" | "document" | "voice";

  @prop({ required: true })
  public originalname!: string;

  @prop()
  public encoding?: string;

  @prop({ required: true })
  public destination!: string;

  @prop({ required: true })
  public filename!: string;

  @prop({ required: true })
  public path!: string;

  @prop({ required: true })
  public size!: number;

  @prop({ required: true })
  public mimetype!: string;

  @prop()
  public thumbnailUrl?: string;

  @prop({ default: false })
  public isTemporary?: boolean;

  @prop({ default: null })
  public expirationDate?: Date;

  @prop({ default: null })
  public caption?: string;

  @prop({ default: false })
  public isStarred?: boolean;

  @prop({ default: false })
  public isDeleted?: boolean;

  @prop()
  public duration?: number;

  @prop()
  public waveform?: string;
}
