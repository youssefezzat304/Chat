import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Chat } from "../chat/chat.model";
import { User } from "../user/user.model";

export class Message {
  @prop({ type: () => Types.ObjectId, default: () => new Types.ObjectId() })
  public _id!: Types.ObjectId;

  @prop({ ref: () => Chat, required: true })
  public chatId: Ref<Chat>;

  @prop({ ref: () => User, required: true })
  public senderId: Ref<User>;

  @prop({ required: true })
  public content: string;

  // @prop()
  // public status: "delivered" | "read";
}
