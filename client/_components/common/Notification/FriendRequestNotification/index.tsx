import Avatar from "@mui/material/Avatar";
import { IoCheckmark, IoClose } from "react-icons/io5";
import dayjs from "dayjs";
import { useHandleFriendRequest } from "@/utils/queries/friendRequest.query";
import { FriendRequestNotificationProps } from "@/types/props.types";

import styles from "./index.module.css";
import ButtonIcon from "../../Icon/ButtonIcon";

const FriendRequestNotification = ({
  request,
  recipientId,
  requesterId,
}: FriendRequestNotificationProps) => {
  const { acceptRequest, rejectRequest } = useHandleFriendRequest();

  const handleAccept = () => {
    acceptRequest({ recipientId, requesterId });
  };
  const handleReject = () => {
    rejectRequest({ recipientId, requesterId });
  };
  return (
    <main className={styles.friendRequestNotification}>
      <section>
        <Avatar
          alt={request.displayName}
          src={request.profilePic}
          variant="rounded"
          className="regular-avatar"
        />
        <div>
          <span>
            <strong>{request.displayName}</strong>
            <p>Wants to connect!</p>
          </span>
        </div>
      </section>
      <section className="flex">
        <ButtonIcon
          title="Accept"
          icon={<IoCheckmark className={styles.acceptIcon} />}
          value="accepted"
          onClick={handleAccept}
        />
        <ButtonIcon
          title="Reject"
          icon={<IoClose className={styles.declienIcon} />}
          value="rejected"
          onClick={handleReject}
        />
      </section>
      <div className={styles.time}>
        {dayjs(request.createAt).format("MMM D, YYYY h:mm A")}
      </div>
    </main>
  );
};
export default FriendRequestNotification;
