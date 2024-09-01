import { User } from "./user.types";

export interface PrivateChat {
  _id: string;
  participants: Array<User>;
  lastMessage: MessageType;
  unreadMessagesCount: number;
  isArchived: boolean;
  isPinned: boolean;
  attachments: Array<Attachment>;
  voiceMessages: Array<Attachment>;
  commonGroups: Array<GroupChat>;
  isGroupChat: boolean;
  mediaFiles: {
    photos: Array<Attachment>;
    videos: Array<Attachment>;
    audios: Array<Attachment>;
  };
  notificationSettings: {
    mute: boolean;
    muteDuration: number | null;
  };
}

export interface GroupChat {
  _id: string;
  participants: Array<User>;
  lastMessage: MessageType;
  unreadMessagesCount: number;
  isArchived: boolean;
  isPinned: boolean;
  attachments: Array<Attachment>;
  voiceMessages: Array<Attachment>;
  commonGroups: Array<GroupChat>;
  isGroupChat: boolean;
  mediaFiles: {
    photos: Array<Attachment>;
    videos: Array<Attachment>;
    audios: Array<Attachment>;
  };
  notificationSettings: {
    mute: boolean;
    muteDuration: number | null;
  };
}
export interface MessageType {
  _id: string;
  chatId: string;
  initiatedBy: User;
  receivedBy: User;
  receivedByType: "user" | "group";
  content: string;
  isRead: boolean;
  isDelivered: boolean;
  isForwarded: boolean;
  isDeleted: boolean;
  mediaUrl: string;
  mediaType: string;
  repliedToMessageId: string | null;
  reaction: string;
  isStarred: boolean;
  seenBy: Array<User>;
  createdAt: string;
  updatedAt: string;
}

export interface Attachment {
  _id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  chat: PrivateChat;
  type: "image" | "video" | "document" | "voice";
  originalname: string;
  encoding: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
  mimetype: string;
  thumbnailUrl: string;
  isTemporary: boolean;
  expirationDate: Date | null;
  caption: string;
  isStarred: boolean;
  isDeleted: boolean;
  url: string;
  createdAt: string;
  updatedAt: string;
}
