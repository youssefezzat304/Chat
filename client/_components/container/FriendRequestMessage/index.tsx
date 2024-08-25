import FriendRequestAlert from "@/_components/common/Alert/FriendRequestAlert";
import { AddFriendRequestMessagesProps } from "@/types/props.types";
import { LinearProgress } from "@mui/material";

const FriendRequestMessage = ({
  control,
  errors,
  isFriendReqSuccessful,
  clear,
  open,
}: AddFriendRequestMessagesProps) => {
  return (
    <>
      {control._formState.isLoading && <LinearProgress color="secondary" />}
      {(errors.recipientEmail || errors.requesterEmail) && (
        <FriendRequestAlert
          title="Error"
          message={
            errors.requesterEmail?.message || errors.recipientEmail?.message
          }
          type="error"
          clearErrors={clear}
          watch={open}
        />
      )}
      {errors.root && !errors.recipientEmail && (
        <FriendRequestAlert
          title="Error"
          message={errors.root.message}
          type="error"
          clearErrors={clear}
          watch={open}
        />
      )}
      {isFriendReqSuccessful === "warning" && (
        <FriendRequestAlert
          title="Warning"
          message="You've already sent a friend request to this user."
          type="warning"
          clearErrors={clear}
          watch={open}
        />
      )}
      {isFriendReqSuccessful === "success" && !errors.root && (
        <FriendRequestAlert
          title="Success"
          message="Your friend request has been successfully sent!"
          type="success"
          clearErrors={clear}
          watch={open}
        />
      )}
    </>
  );
};

export default FriendRequestMessage;