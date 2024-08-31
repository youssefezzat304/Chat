import {
  DocumentType,
  modelOptions,
  pre,
  prop,
  Ref,
  Severity,
} from "@typegoose/typegoose";
import bcrypt from "bcrypt";
import { Types } from "mongoose";
import { PrivateChat } from "../privateChat/privateChat.model";
import { GroupChat } from "../groupChat/groupChat.model";

export const privateFeilds = ["password", "__v"];
class FriendRequests {
  @prop({
    type: () => [User],
    ref: () => User,
    default: [],
  })
  public incoming!: Ref<User>[];

  @prop({
    type: () => [User],
    ref: () => User,
    default: [],
  })
  public outgoing!: Ref<User>[];
}
@pre<User>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
})
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class User {
  @prop({ type: () => Types.ObjectId, default: () => new Types.ObjectId() })
  public _id!: Types.ObjectId;

  @prop({ required: true })
  public displayName: string;

  @prop({ lowercase: true, required: true, unique: true })
  public email: string;

  @prop({ required: true })
  password: string;

  @prop({ default: "" })
  public profilePicture: string;

  @prop({ ref: () => User, default: [] })
  public friends: Ref<User>[];

  @prop({
    type: () => FriendRequests,
    _id: false,
    default: () => ({}),
  })
  public friendRequests!: FriendRequests;

  @prop({ ref: () => PrivateChat, default: [] })
  public chats: Ref<PrivateChat>[];

  @prop({ ref: () => GroupChat, default: [] })
  public groupChats: Ref<GroupChat>[];

  @prop({ default: "" })
  public birthDate: string;

  @prop({ default: false })
  public onlineStatus: boolean;

  @prop({ default: Date.now })
  public lastSeen!: Date;

  @prop({ default: "" })
  public phoneNumber: string;

  @prop({ default: "Hey there I am using chat app..." })
  public bio: string;

  @prop({ default: { country: "", city: "", postalCode: "" } })
  public address: {
    country: string;
    city: string;
    postalCode: string;
  };
  async validatePassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      console.log(error, "Couldn't validate password.");
      return false;
    }
  }
}
