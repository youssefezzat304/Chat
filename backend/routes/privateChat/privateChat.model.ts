import { modelOptions, prop, Ref, Severity } from "@typegoose/typegoose";
import { User } from "../user/user.model";
import { Message } from "../message/message.model";
import { Types } from "mongoose";
import { Attachment } from "../attachment/attachment.model";
import { GroupChat } from "../groupChat/groupChat.model";

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class PrivateChat {
  @prop({ type: () => Types.ObjectId, default: () => new Types.ObjectId() })
  public _id!: Types.ObjectId;

  @prop({ type: () => [User], ref: () => User, default: [] })
  public participants!: Ref<User>[];

  @prop({ ref: () => Message })
  public lastMessage?: Ref<Message>;

  @prop({ default: 0 })
  public unreadMessagesCount?: number;

  @prop({ default: false })
  public isArchived?: boolean;

  @prop({ default: false })
  public isPinned?: boolean;

  @prop({ type: () => [Attachment], default: [] })
  public attachments?: Array<Attachment>;

  @prop({ type: () => [Attachment], default: [] })
  public voiceMessages?: Array<Attachment>;

  @prop({ default: [] })
  public commonGroups?: Array<Ref<GroupChat>>;

  @prop({ default: false })
  public isGroupChat: boolean;

  @prop({
    default: {
      photos: [],
      videos: [],
      audios: [],
    },
  })
  public mediaFiles?: {
    photos: Ref<Attachment>[];
    videos: Ref<Attachment>[];
    audios: Ref<Attachment>[];
  };

  @prop({
    default: {
      mute: false,
      muteDuration: null,
    },
  })
  public notificationSettings?: {
    mute: boolean;
    muteDuration: number | null;
  };
}
