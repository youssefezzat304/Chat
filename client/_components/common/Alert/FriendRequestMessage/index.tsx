import FriendRequestAlert from "@/_components/common/Alert/FriendRequestAlert";
import { AddFriendRequestMessagesProps } from "@/types/props.types";
import { LinearProgress } from "@mui/material";
import { memo } from "react";

const FriendRequestMessage = ({
  control,
  errors,
  isFriendReqSuccessful,
  clear,
  open,
}: AddFriendRequestMessagesProps) => {
  let alertMessage: string | undefined;
  let alertTitle: string | undefined;
  let alertType: "success" | "error" | "warning" | "info" = "error";

  if (control._formState.isLoading) {
    return <LinearProgress color="secondary" />;
  }

  switch (true) {
    case !!errors.recipientEmail || !!errors.requesterEmail:
      alertTitle = "Error";
      alertMessage =
        errors.requesterEmail?.message || errors.recipientEmail?.message;
      alertType = "error";
      break;

    case !!errors.root && isFriendReqSuccessful === "warning":
      alertTitle = "Warning";
      alertMessage = errors.root.message;
      alertType = "warning";
      break;

    case !!errors.root:
      alertTitle = "Error";
      alertMessage = errors.root.message;
      alertType = "error";
      break;

    case isFriendReqSuccessful === "success":
      alertTitle = "Success";
      alertMessage = "Your friend request has been successfully sent!";
      alertType = "success";
      break;

    default:
      break;
  }

  return (
    <>
      {alertMessage && (
        <FriendRequestAlert
          title={!alertTitle ? "" : alertTitle}
          message={alertMessage}
          type={alertType}
          clearErrors={clear}
          watch={open}
        />
      )}
    </>
  );
};

export default memo(FriendRequestMessage);
