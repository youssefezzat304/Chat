"use client";
import { LuUpload } from "react-icons/lu";
import UploadProfilePic from "../components/SVGs/UploadProfilePic";
import { CurrentUser } from "../utils/types/user.interfaces";
import {
  MdDelete,
  MdModeEditOutline,
  MdOutlineDataSaverOn,
} from "react-icons/md";
import { Control, FieldErrors, SubmitHandler } from "react-hook-form";
import { FaUndo } from "react-icons/fa";
import UploadFileBtn from "../components/buttons/UploadFileBtn";
import { useState } from "react";
import { Avatar } from "@mui/material";
import { useUserStore } from "../utils/stores/user.store";
import DisplayImage from "../components/others/DisplayImage";
// import DisplayImage from "../components/others/DisplayImage";

type ProfileLeftSectionProps = {
  control: Control<any>;
  activeUser: CurrentUser;
  saveChanges: SubmitHandler<CurrentUser>;
  resetSettings: () => void;
  errors: FieldErrors<CurrentUser>;
};

const ProfileLeftSection = ({
  control,
  activeUser,
  saveChanges,
  resetSettings,
  errors,
}: ProfileLeftSectionProps) => {
  const [editName, setEditName] = useState(false);
  const setProfilePic = useUserStore((state) => state.setProfilePic);
  const profilePic = useUserStore((state) => state.profilePic);
  const setPpFile = useUserStore((state) => state.setPpFile);

  const handleEditName = () => {
    setEditName(!editName);
  };
  const handleUploadProfilePicture = (event: any) => {
    const file = event.target.files[0];
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
      className="profile-left-sec"
      onSubmit={control.handleSubmit((data) => saveChanges(data))}
    >
        {profilePic ? (
          <DisplayImage className="pp-container" base64String={profilePic} />
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
          className="edit-name-icon"
          title="Edit display name"
          onClick={handleEditName}
        />
      </section>
      <UploadFileBtn
        icon={<LuUpload className="upload-pp-icon" />}
        text="Upload photo"
        classNameStlyes="upload-pp-Btn"
        onChangeEvent={handleUploadProfilePicture}
      />
      <button
        type="button"
        title="Remove profile picture"
        className="remove-pp-Btn"
        onClick={removeProfilePhoto}
      >
        <MdDelete className="remove-pp-icon" />
        Remove photo
      </button>
      <button
        type="button"
        title="Reset settings"
        className="reset-Btn"
        onClick={resetSettings}
      >
        <FaUndo className="remove-pp-icon" />
        Reset
      </button>
      {errors.displayName ? (
        <span className="pp-error">{errors.displayName.message}</span>
      ) : (
        <span className="pp-error"></span>
      )}

      {control._formState.isLoading ? (
        <button
          type="button"
          disabled
          title="Save changes"
          className="save-Btn"
        >
          loading...
        </button>
      ) : (
        <button type="submit" title="Save changes" className="save-Btn">
          <MdOutlineDataSaverOn className="remove-pp-icon" />
          Save changes
        </button>
      )}
    </form>
  );
};

export default ProfileLeftSection;
