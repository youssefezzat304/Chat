import { modelOptions, prop, Ref, Severity } from "@typegoose/typegoose";
import { User } from "../user/user.model";
import { EventLog } from "../events/events.model";
import { Attachment } from "../attachment/attachment.model";
import { Message } from "../message/message.model";
import { Types } from "mongoose";

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class GroupChat {
  @prop({ type: () => Types.ObjectId, default: () => new Types.ObjectId() })
  public _id!: Types.ObjectId;

  @prop({ default: "" })
  public groupName?: string;

  @prop({ default: "" })
  public groupPicture?: string;

  @prop({ default: "" })
  public groupDescription?: string;

  @prop({ ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ default: [] })
  public Admins?: Array<Ref<User>>;

  @prop({ default: [] })
  public eventsLog?: Array<EventLog>;

  @prop({ type: () => [User], ref: () => User, default: [] })
  public participants!: Ref<User>[];

  @prop({ ref: () => Message })
  public lastMessage?: Ref<Message>;

  @prop({ default: 0 })
  public unreadMessagesCount?: number;

  @prop({ type: () => [Attachment], default: [] })
  public attachments?: Array<Attachment>;

  @prop({ type: () => [Attachment], default: [] })
  public voiceMessages?: Array<Attachment>;

  @prop({ default: false })
  public isGroupChat: boolean;

  @prop({ default: false })
  public isArchived?: boolean;

  @prop({ default: false })
  public isPinned?: boolean;

  @prop({
    default: {
      photos: [],
      videos: [],
      audios: [],
    },
  })
  public mediaFiles?: {
    photos: Array<Ref<Attachment>>;
    videos: Array<Ref<Attachment>>;
    audios: Array<Ref<Attachment>>;
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
