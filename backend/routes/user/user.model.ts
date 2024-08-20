import {
  DocumentType,
  pre,
  prop,
  Ref,
} from "@typegoose/typegoose";
import bcrypt from "bcrypt";
import { Types } from "mongoose";
import { Chat } from "../chat/chat.model";

export const privateFeilds = ["password", "__v"];

@pre<User>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
})
export class User {
  @prop({ type: () => Types.ObjectId, default: () => new Types.ObjectId() })
  public _id!: Types.ObjectId;

  @prop({ lowercase: true, required: true, unique: true })
  public email: string;

  @prop({ required: true })
  password: string;

  @prop({ ref: () => User, default: [] })
  public friends: Ref<User>[];

  @prop({ ref: () => User, default: [] })
  public friendRequestsSent: Ref<User>[];

  @prop({ ref: () => User, default: [] })
  public friendRequestsReceived: Ref<User>[];

  @prop({ ref: () => Chat, default: [] })
  public chats: Ref<Chat>[];

  @prop({ required: true })
  public displayName: string;

  @prop({ default: "" })
  birthDate: string;

  @prop({ default: "" })
  profilePic: string;

  @prop({ default: "" })
  public phoneNumber: string;

  @prop({ default: "Hey there I am using chat app..." })
  public status: string;

  @prop({ default: "" })
  public country: string;

  @prop({ default: "" })
  public city: string;

  @prop({ default: "" })
  public postalCode: string;

  // @prop()
  // public addresse: {
  //   country: string;
  //   city: string;
  //   postalCode: string;
  // };
  async validatePassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      console.log(error, "Couldn't validate password.");
      return false;
    }
  }
}
