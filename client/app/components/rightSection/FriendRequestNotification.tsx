import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";
import { Icon } from "./NotificationsHeader";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { NotificationProps } from "./Notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleFriendRequest } from "@/app/api/friendrequest.api";
import { useUserStore } from "@/app/utils/stores/user.store";
import dayjs from "dayjs";

export const FriendRequestNotification = ({
  request,
  recipientId,
  requesterId,
}: NotificationProps) => {
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
  const acceptRequest = async () => {
    try {
      const updatedUser = await handleFriendrequest({
        recipientId: recipientId,
        requesterId: requesterId,
        status: "accepted",
      });
    } catch (error) {
      console.log("failed to accept");
    }
  };
  const rejectRequest = async () => {
    try {
      const updatedUser = await handleFriendrequest({
        recipientId: recipientId,
        requesterId: requesterId,
        status: "rejected",
      });
    } catch (error) {
      console.log("failed to reject");
    }
  };
  return (
    <main className="friendrequest-notification">
      <section>
        <Avatar
          alt={request.displayName}
          src={request.profilePic}
          variant="rounded"
          className="regular-avatar"
        />
        <div className="info">
          <span>
            <strong>{request.displayName}</strong>
            <p>Wants to connect!</p>
          </span>
        </div>
      </section>
      <section className="flex">
        <Icon
          title="Accept"
          icon={<IoCheckmark className="accept-FR-icon" />}
          value="accepted"
          onClick={acceptRequest}
        />
        <Icon
          title="Reject"
          icon={<IoClose className="decline-FR-icon" />}
          value="rejected"
          onClick={rejectRequest}
        />
      </section>
      <div className="time">
        {dayjs(request.createAt).format("MMM D, YYYY h:mm A")}
      </div>
    </main>
  );
};
