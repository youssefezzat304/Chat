import axios from "axios";

const orginURL = "http://localhost:3000/api";

export const api = axios.create({
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
    const response = await api.patch(
      `/friend-request/${status}/${recipientId}`,
      reqData,
      {
        headers: { withCredentials: true },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
