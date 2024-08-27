import { FriendRequestType } from "@/types/friendSystem.types";
import axios from "axios";

const orginURL = process.env.NEXT_PUBLIC_API_FRIEND_REQUEST;

const api = axios.create({
  baseURL: orginURL,
});

export const sendFriendRequest = async (requestData: {
  requesterEmail: string;
  recipientEmail: string;
}) => {
  try {
    await api.post(
      `/friend-request/add/${requestData.recipientEmail}`,
      requestData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
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
    const response = await api.patch(`/${status}/${recipientId}`, reqData, {
      headers: { withCredentials: true },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
