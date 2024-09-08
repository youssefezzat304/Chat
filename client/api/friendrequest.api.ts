import { FriendRequestType } from "@/types/friendSystem.types";
import { axiosPrivate } from "./axios";

export const sendFriendRequest = async (requestData: {
  requesterEmail: string;
  recipientEmail: string;
}) => {
  try {
    const response = await axiosPrivate.post(
      `/add/${requestData.recipientEmail}`,
      requestData,
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const handleFriendRequest = async ({
  recipientId,
  requesterId,
  status,
}: FriendRequestType) => {
  const reqData = {
    requesterId: requesterId,
    recipientId: recipientId,
  };
  try {
    const response = await axiosPrivate.patch(
      `/${status}/${recipientId}`,
      reqData,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
