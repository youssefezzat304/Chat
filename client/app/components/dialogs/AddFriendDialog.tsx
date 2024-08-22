import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Fragment, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import AddFriend from "../scenes/AddFriend";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@/app/utils/stores/user.store";
import { FriendRequestState } from "@/app/utils/types/friendSystem.interfaces";
import {
  FriendRequestSchema,
  friendRequestValidation,
} from "@/app/utils/validation/friendSystem.validation";
import { api } from "@/app/api/axios";

export default function AddFriendDialog() {
  const user = useUserStore((state) => state.user);
  const [open, setOpen] = useState(false);
  const [isFriendReqSuccessful, setIsFriendReqSuccessful] =
    useState<FriendRequestState>(null);
  // ------------- Add Friend ------------------------------ //
  const {
    control,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm<FriendRequestSchema>({
    resolver: zodResolver(friendRequestValidation),
  });

  const handleFriendRequest: SubmitHandler<FriendRequestSchema> = async (
    data,
  ) => {
    if (data.recipientEmail === user?.email) {
      setIsFriendReqSuccessful(null);
      setError("root", {
        message:
          "Oops! It looks like you're trying to send a friend request to yourself. While we think you're great, you can't be friends with yourself on this platform. Please choose someone else to connect with!",
      });
      return;
    }
    const requestData = {
      requesterEmail: user?.email,
      recipientEmail: data.recipientEmail,
    };
    try {
      await api.post(
        `/friend-request/add/${requestData.recipientEmail}`,
        requestData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

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
        className="side-Btn"
        type="button"
        title="Add Friend"
        onClick={handleClickOpen}
      >
        <FaUserPlus className="side-icon" />
        Add Friend
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: control.handleSubmit(handleFriendRequest),
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
