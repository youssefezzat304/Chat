import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "../user/user.model";

export class Session {
  @prop({ ref: () => User })
  user: Ref<User>;

  @prop()
  token: string;

  @prop({ default: true })
  valid: boolean;
}
