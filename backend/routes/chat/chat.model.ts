import { prop, Ref } from "@typegoose/typegoose";
import { User } from "../user/user.model";
import { Message } from "../message/message.model";

export class Chat {
  @prop({ ref: () => User, default: [] })
  public participants: Ref<User>[];

  @prop({ ref: () => Message, default: null })
  public lastMessage: Ref<Message>;

  @prop({ default: "private" })
  public type: "private" | "group";
}