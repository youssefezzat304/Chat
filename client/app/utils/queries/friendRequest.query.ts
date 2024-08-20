import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleFriendRequest } from "../../api/friendrequest.api";
import { useUserStore } from "../stores/user.store";
import { NotificationProps } from "../../components/rightSection/Notification";

export const useHandleFriendRequest = () => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);

  const { mutateAsync: handleFriendrequest } = useMutation({
    mutationFn: handleFriendRequest,
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      if (updatedUser) {
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  const acceptRequest = async ({
    recipientId,
    requesterId,
  }: NotificationProps) => {
    try {
      await handleFriendrequest({
        recipientId: recipientId,
        requesterId: requesterId,
        status: "accepted",
      });
    } catch (error) {
      console.error("Failed to accept request", error);
    }
  };

  const rejectRequest = async ({
    recipientId,
    requesterId,
  }: NotificationProps) => {
    try {
      await handleFriendrequest({
        recipientId: recipientId,
        requesterId: requesterId,
        status: "rejected",
      });
    } catch (error) {
      console.error("Failed to reject request", error);
    }
  };

  return {
    acceptRequest,
    rejectRequest,
  };
};
