import { modelOptions, prop, Ref, Severity } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { PrivateChat } from "../privateChat/privateChat.model";
import { User } from "../user/user.model";
import { GroupChat } from "../groupChat/groupChat.model";

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Message {
  @prop({ type: () => Types.ObjectId, default: () => new Types.ObjectId() })
  public _id!: Types.ObjectId;

  @prop({ ref: () => PrivateChat, required: true })
  public chatId: Ref<PrivateChat>;

  @prop({ ref: () => User, required: true })
  public initiatedBy: Ref<User>;

  @prop({ type: () => String, enum: ["user", "group"], required: true })
  public receivedByType!: "user" | "group";

  @prop({ refPath: "receivedByType" })
  public receivedBy: Ref<User> | Ref<GroupChat>;

  @prop({ required: true })
  public content: string;

  @prop({ default: false })
  public isRead!: boolean;

  @prop({ default: false })
  public isDelivered!: boolean;

  @prop({ default: false })
  public isForwarded!: boolean;

  @prop({ default: false })
  public isDeleted!: boolean;

  @prop({ default: "" })
  public mediaUrl?: string;

  @prop({ default: "" })
  public mediaType?: string;

  @prop({ ref: () => Message, default: null })
  public repliedToMessageId?: Ref<Message>;

  @prop({ default: "" })
  public reaction?: string;

  @prop({ default: false })
  public isStarred!: boolean;

  @prop({ default: [] })
  public seenBy!: Array<Ref<User>>;
}
