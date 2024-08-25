"use client";
import { useEffect, useState } from "react";
import AddFriendRequest from "../../SVGs/AddFriendRequest";
import { AddFriendProps } from "@/types/props.types";
import FriendRequestMessage from "../FriendRequestMessage";

import styles from "./index.module.css";

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
    <main className={styles.addFriendMain}>
      <section className={styles.addFriendContainer}>
        <label>ADD FRIEND</label>
        <p>You can add friends with their email.</p>
        <div className={styles.inputContainer}>
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
        <FriendRequestMessage
          control={control}
          open={open}
          clear={clear}
          errors={errors}
          isFriendReqSuccessful={isFriendReqSuccessful}
        />
        <div className={styles.addFriendSVG}>
          <AddFriendRequest />
        </div>
        <button
          className={styles.cancelBtn}
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
