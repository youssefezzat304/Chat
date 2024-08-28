import dayjs from "dayjs";

export const assetTimestamp = (timestamp?: string) => {
  const today = dayjs();
  const givenDate = dayjs(timestamp);

  if (today.isSame(givenDate, "day")) {
    return givenDate.format("hh:mm A");
  } else {
    return givenDate.format("DD/MM/YY hh:mm A");
  }
};

export const hourTimestamp = (timestamp?: string) => {
  const now = dayjs();
  const givenDate = dayjs(timestamp);
  const differenceInMinutes = now.diff(givenDate, "minute");

  if (differenceInMinutes < 60) {
    return `${differenceInMinutes}m`;
  } else if (now.isSame(givenDate, "day")) {
    return givenDate.format("hh:mm A");
  } else {
    return givenDate.format("DD/MM/YY hh:mm A");
  }
};
