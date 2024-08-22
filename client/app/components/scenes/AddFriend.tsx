"use client";
import { Control, FieldErrors, UseFormClearErrors } from "react-hook-form";
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import AddFriendRequest from "../SVGs/AddFriendRequest";
import { LinearProgress } from "@mui/material";
import TextBoxAlert from "../alerts/FriendRequest.alert";
import { FriendRequestSchema } from "@/app/utils/validation/friendSystem.validation";
import { FriendRequestState } from "@/app/utils/types/friendSystem.interfaces";

type AddFriendProps = {
  control: Control<FriendRequestSchema>;
  errors: FieldErrors<FriendRequestSchema>;
  handleClose: MouseEventHandler;
  setIsFriendReqSuccessful: Dispatch<SetStateAction<FriendRequestState>>;
  isFriendReqSuccessful: FriendRequestState;
  clearErrors: UseFormClearErrors<FriendRequestSchema>;
};
const AddFriend = ({
  control,
  errors,
  handleClose,
  setIsFriendReqSuccessful,
  isFriendReqSuccessful,
  clearErrors,
}: AddFriendProps) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (isFriendReqSuccessful) setOpen(true);
  }, [isFriendReqSuccessful]);

  const clear = () => {
    setIsFriendReqSuccessful(null);
    clearErrors();
  };
  return (
    <main className="add-friend-main">
      <section className="add-friend-container">
        <label>ADD FRIEND</label>
        <p>You can add friends with their email.</p>
        <div className="input-container">
          <input
            type="email"
            title="Add Friend"
            placeholder="You can add friends with their email."
            {...control.register("recipientEmail")}
          />
          <button type="submit" title="Send Friend Request">
            Send Friend Request
          </button>
        </div>
        <AddFriendRequestMessages
          control={control}
          open={open}
          clear={clear}
          errors={errors}
          isFriendReqSuccessful={isFriendReqSuccessful}
        />
        <div className="addfriend-svg">
          <AddFriendRequest />
        </div>
        <button
          className="cancel-Btn"
          title="close"
          type="button"
          onClick={handleClose}
        >
          Cancel
        </button>
      </section>
    </main>
  );
};

export default AddFriend;

type AddFriendRequestMessagesProps = {
  control: Control<FriendRequestSchema>;
  errors: FieldErrors<FriendRequestSchema>;
  isFriendReqSuccessful: FriendRequestState;
  clear: () => void;
  open: boolean;
};
const AddFriendRequestMessages = ({
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
        <TextBoxAlert
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
        <TextBoxAlert
          title="Error"
          message={errors.root.message}
          type="error"
          clearErrors={clear}
          watch={open}
        />
      )}
      {isFriendReqSuccessful === "warning" && (
        <TextBoxAlert
          title="Warning"
          message="You've already sent a friend request to this user."
          type="warning"
          clearErrors={clear}
          watch={open}
        />
      )}
      {isFriendReqSuccessful === "success" && !errors.root && (
        <TextBoxAlert
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
