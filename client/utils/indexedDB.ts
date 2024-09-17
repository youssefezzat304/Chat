import { PrivateChat } from "@/types/chat.types";
import Dexie, { type EntityTable } from "dexie";

const db = new Dexie("recentChatsDB") as Dexie & {
  recentChatsDB: EntityTable<PrivateChat, "_id">;
};

db.version(1).stores({
  recentChatsDB:
    "_id, participants, lastMessage, unreadMessagesCount,isArchived,isPinned,attachments,voiceMessages,commonGroups,isGroupChat,mediaFiles,notificationSettings",
});

export { db };
