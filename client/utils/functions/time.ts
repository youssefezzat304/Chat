import { MessageInterface } from "@/types/chat.types";
import dayjs from "dayjs";

export const messageTimestamp = (timestamp?: string) => {
  const today = dayjs();
  const givenDate = dayjs(timestamp);

  if (today.isSame(givenDate, "day")) {
    return givenDate.format("hh:mm A");
  } else {
    return givenDate.format("DD/MM/YY hh:mm A");
  }
};

export const timestamp = (timestamp?: string) => {
  if (!timestamp) return "";

  const now = dayjs();
  const givenDate = dayjs(timestamp);
  const differenceInMinutes = now.diff(givenDate, "minute");
  const differenceInHours = now.diff(givenDate, "hour");
  const differenceInDays = now.diff(givenDate, "day");

  if (differenceInMinutes < 60) {
    return `${differenceInMinutes}m`;
  } else if (differenceInHours < 24) {
    return `${differenceInHours}h`;
  } else if (differenceInDays === 1) {
    return "Yesterday";
  } else if (differenceInDays < 7) {
    return givenDate.format("dddd");
  } else {
    return givenDate.format("DD/MM/YY hh:mm A");
  }
};

export const getDayLabel = (timestamp: string) => {
  const now = dayjs();
  const givenDate = dayjs(timestamp);
  const differenceInHours = now.diff(givenDate, "hour");
  const startOfToday = dayjs().startOf("day"); // Midnight of today

  if (
    givenDate.isAfter(startOfToday) &&
    now.isBefore(startOfToday.add(24, "hour"))
  ) {
    return "Today";
  } else if (differenceInHours < 48 && givenDate.isBefore(startOfToday)) {
    return "Yesterday";
  } else if (now.diff(givenDate, "day") >= 7) {
    return givenDate.format("DD/MM/YYYY");
  } else {
    return givenDate.format("dddd");
  }
};

interface GroupedMessages {
  [key: string]: MessageInterface[];
}
export const groupMessagesByDay = (
  messages: MessageInterface[],
): GroupedMessages => {
  return messages.reduce((acc: GroupedMessages, message) => {
    const dayLabel = getDayLabel(message.createdAt);

    if (!acc[dayLabel]) {
      acc[dayLabel] = [];
    }

    acc[dayLabel].push(message);
    return acc;
  }, {});
};
