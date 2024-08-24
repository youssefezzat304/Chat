import Avatar from "@mui/material/Avatar";
import { Icon } from "../headers/NotificationsHeader";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { NotificationProps } from "./Notification";
import dayjs from "dayjs";
import { useHandleFriendRequest } from "@/app/utils/queries/friendRequest.query";

const FriendRequestNotification = ({
  request,
  recipientId,
  requesterId,
}: NotificationProps) => {
  const { acceptRequest, rejectRequest } = useHandleFriendRequest();

  const handleAccept = () => {
    acceptRequest({ recipientId, requesterId });
  };
  const handleReject = () => {
    rejectRequest({ recipientId, requesterId });
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
          onClick={handleAccept}
        />
        <Icon
          title="Reject"
          icon={<IoClose className="decline-FR-icon" />}
          value="rejected"
          onClick={handleReject}
        />
      </section>
      <div className="time">
        {dayjs(request.createAt).format("MMM D, YYYY h:mm A")}
      </div>
    </main>
  );
};
export default FriendRequestNotification;
