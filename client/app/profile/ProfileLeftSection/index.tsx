"use client";
import { ChangeEvent, useState } from "react";
import {
  MdDelete,
  MdModeEditOutline,
  MdOutlineDataSaverOn,
} from "react-icons/md";
import { FaUndo } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";
import { useUserStore } from "@/utils/stores";
import { DisplayImage, UploadFileBtn, UploadProfilePic } from "@/_components";
import { ProfileLeftSectionProps } from "@/types/props.types";

import styles from "./index.module.css";

const ProfileLeftSection = ({
  control,
  activeUser,
  saveChanges,
  resetSettings,
  errors,
}: ProfileLeftSectionProps) => {
  const [editName, setEditName] = useState(false);
  const { setProfilePic, profilePic, setPpFile } = useUserStore();

  const handleEditName = () => {
    setEditName(!editName);
  };
  const handleUploadProfilePicture = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPpFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePhoto = () => {
    setProfilePic("");
  };
  return (
    <form
      className={styles.profileLeftSec}
      onSubmit={control.handleSubmit((data) => saveChanges(data))}
    >
      {profilePic ? (
        <DisplayImage
          className={styles.ppContainer}
          base64String={profilePic}
        />
      ) : (
        <UploadProfilePic />
      )}
      <section>
        <input
          type="text"
          defaultValue={activeUser.displayName}
          {...control.register("displayName")}
        />
        <MdModeEditOutline
          className={styles.editNameIcon}
          title="Edit display name"
          onClick={handleEditName}
        />
      </section>
      <UploadFileBtn
        icon={<LuUpload className={styles.uploadProfilePicIcon} />}
        text="Upload photo"
        classNameStlyes={styles.uploadProfilePicBtn}
        onChangeEvent={handleUploadProfilePicture}
      />
      <button
        type="button"
        title="Remove profile picture"
        className={styles.removePpBtn}
        onClick={removeProfilePhoto}
      >
        <MdDelete className={styles.removePpIcon} />
        Remove photo
      </button>
      <button
        type="button"
        title="Reset settings"
        className={styles.resetBtn}
        onClick={resetSettings}
      >
        <FaUndo className={styles.removePpIcon} />
        Reset
      </button>
      {errors.displayName ? (
        <span className={styles.profilePicError}>
          {errors.displayName.message}
        </span>
      ) : (
        <span className={styles.profilePicError}></span>
      )}

      {control._formState.isLoading ? (
        <button
          type="button"
          disabled
          title="Save changes"
          className={styles.saveBtn}
        >
          loading...
        </button>
      ) : (
        <button type="submit" title="Save changes" className={styles.saveBtn}>
          <MdOutlineDataSaverOn className={styles.removePpIcon} />
          Save changes
        </button>
      )}
    </form>
  );
};

export default ProfileLeftSection;
