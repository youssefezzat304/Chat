import axios from "axios";

const orginURL = process.env.NEXT_PUBLIC_API_FRIEND_REQUEST;

const api = axios.create({
  baseURL: orginURL,
});

export const handleFriendRequest = async ({
  recipientId,
  requesterId,
  status,
}: {
  recipientId: string | undefined;
  requesterId: string | undefined;
  status: string;
}) => {
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
