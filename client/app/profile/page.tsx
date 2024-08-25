"use client";


import { useState } from "react";
import styles from "./index.module.css";
import { useTabsStore, useUserStore } from "@/utils/stores";
import useAuthenticateUser from "@/hooks/useAuthenticateUser";
import { useForm } from "react-hook-form";
import { User } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from "@/utils/validation/user.validation";
import { deleteProfilePic, sendProfilePic, updateInfo } from "@/api/axios";
import { FriendRequests, NavBar, Notifications, RoutesLoading } from "@/_components";
import { Panel, PanelGroup } from "react-resizable-panels";
import ProfileLeftSection from "./ProfileLeftSection";
import ProfileFormSection from "./ProfileFormSection";
import { Alert, Snackbar } from "@mui/material";

const ProfileSettings = () => {
  const [open, setOpen] = useState(false);
  const { user, ppFile, profilePic, setProfilePic } = useUserStore();
  const { isLoading } = useAuthenticateUser();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<User>({
    defaultValues: user ? user : undefined,
    resolver: zodResolver(userValidation),
  });

  const saveChanges = async (data: User) => {
    setOpen(false);
    try {
      const response = await updateInfo(data);
      if (profilePic === "") {
        const profilePicRes = await deleteProfilePic(user?._id);
        setProfilePic(profilePicRes?.profilePic);
      }
      if (ppFile) {
        const profilePicRes = await sendProfilePic(ppFile, user?._id);
        setProfilePic(profilePicRes.data.profilePic);
      }
      return;
    } catch (error) {
      console.log(error);
    }
    setOpen(true);
  };

  function resetSettings() {
    if (user) reset(user);
  }

  const notificationsTab = useTabsStore((state) => state.notificationsTab);
  const friendRequestsTab = useTabsStore((state) => state.friendRequestsTab);
  const handleClose = () => {
    setOpen(false);
  };

  if (!user) return <RoutesLoading />;
  return (
    <main className={styles.main}>
      <div className={styles.mainScreen}>
        <NavBar />
        <PanelGroup direction="horizontal" autoSaveId="main">
          <Panel defaultSize={75} minSize={75}>
            <div className={styles.mainProfileSec}>
              <ProfileLeftSection
                control={control}
                activeUser={user}
                saveChanges={saveChanges}
                resetSettings={resetSettings}
                errors={errors}
              />
              <ProfileFormSection
                control={control}
                activeUser={user}
                handleSubmit={handleSubmit}
                saveChanges={saveChanges}
                errors={errors}
                setValue={setValue}
              />
            </div>
          </Panel>
          {notificationsTab || friendRequestsTab ? (
            <Panel defaultSize={30} minSize={22} maxSize={30}>
              {notificationsTab ? (
                <Notifications />
              ) : friendRequestsTab ? (
                <FriendRequests />
              ) : null}
            </Panel>
          ) : (
            <Panel
              className={styles.profileSettingsSec}
              defaultSize={30}
              minSize={20}
              maxSize={30}
            ></Panel>
          )}
        </PanelGroup>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
          }}
        >
          Changes saved successfully!
        </Alert>
      </Snackbar>
    </main>
  );
};

export default ProfileSettings;
