import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Fragment, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import AddFriend from "../../../container/AddFriend";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@/utils/stores";
import { FriendRequestState } from "@/types/friendSystem.types";
import {
  FriendRequestSchema,
  friendRequestValidation,
} from "@/utils/validation/friendSystem.validation";
import styles from "./index.module.css";
import { sendFriendRequest } from "@/api/friendrequest.api";

export default function AddFriendDialog() {
  const user = useUserStore((state) => state.user);
  const [open, setOpen] = useState(false);
  const [isFriendReqSuccessful, setIsFriendReqSuccessful] =
    useState<FriendRequestState>(null);

  const {
    control,
    setError,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm<FriendRequestSchema>({
    resolver: zodResolver(friendRequestValidation),
  });

  const handleFriendRequest: SubmitHandler<FriendRequestSchema> = async (
    data
  ) => {
    if (!user) throw Error("NO Current User data.");
    if (data.recipientEmail === user.email) {
      setIsFriendReqSuccessful(null);
      setError("root", {
        message:
          "Oops! It looks like you're trying to send a friend request to yourself. While we think you're great, you can't be friends with yourself on this platform. Please choose someone else to connect with!",
      });
      return;
    }
    const requestData = {
      requesterEmail: user.email,
      recipientEmail: data.recipientEmail,
    };
    try {
      await sendFriendRequest(requestData);

      clearErrors();
      setIsFriendReqSuccessful("success");
    } catch (error: any) {
      if (error.response.status === 404) {
        setIsFriendReqSuccessful(null);
        setError("root", {
          message: error.response.data.message,
        });
      }
      if (error.response.status === 400) {
        clearErrors();
        setIsFriendReqSuccessful("warning");
      }
      console.log(error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    clearErrors();
    setOpen(false);
  };
  return (
    <Fragment>
      <button
        className={styles.sideBtn}
        type="button"
        title="Add Friend"
        onClick={handleClickOpen}
      >
        <FaUserPlus className={styles.sideIcon} />
        Add Friend
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit(handleFriendRequest),
        }}
      >
        <DialogContent>
          <AddFriend
            control={control}
            errors={errors}
            handleClose={handleClose}
            setIsFriendReqSuccessful={setIsFriendReqSuccessful}
            isFriendReqSuccessful={isFriendReqSuccessful}
            clearErrors={clearErrors}
          />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
