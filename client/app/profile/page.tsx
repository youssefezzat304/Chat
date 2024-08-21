"use client";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import SideBarButtons from "../components/buttons/SideBarButtons";
import Loading from "../components/scenes/loading";
import ProfileLeftSection from "./ProfileLeftSection";
import ProfileFormSection from "./ProfileFormSection";
import { useForm } from "react-hook-form";
import { User } from "../utils/types/user.interfaces";
import { userValidation } from "../utils/validation/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import ProfileLoading from "./ProfileLoading";
import { deleteProfilePic, sendProfilePic, updateInfo } from "../api/axios";
import { Alert, Snackbar } from "@mui/material";
import Notifications from "../components/windows/Notifications";
import { useOpenTabsStore } from "../utils/stores/handleTabs.store";
import FriendRequests from "../components/windows/FriendRequests";
import { useUserStore } from "../utils/stores/user.store";
import useAuthenticateUser from "../hooks/useAuthenticateUser";

const ProfileSettings = () => {
  const [open, setOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const ppFile = useUserStore((state) => state.ppFile);
  const profilePic = useUserStore((state) => state.profilePic);
  const setProfilePic = useUserStore((state) => state.setProfilePic);
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
        setProfilePic(profilePicRes.data.profilePic);
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

  const notificationsTab = useOpenTabsStore((state) => state.notificationsTab);
  const friendRequestsTab = useOpenTabsStore(
    (state) => state.friendRequestsTab
  );

  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading) return <ProfileLoading />;

  if (!user) return <Loading />;

  return (
    <main className="main">
      <div className="main-screen">
        <SideBarButtons />
        <PanelGroup direction="horizontal" autoSaveId="main">
          <Panel defaultSize={75} minSize={75}>
            <div className="main-profile-sec">
              <ProfileLeftSection
                control={control}
                activeUser={user ? user : {}}
                saveChanges={saveChanges}
                resetSettings={resetSettings}
                errors={errors}
              />
              <ProfileFormSection
                control={control}
                activeUser={user ? user : {}}
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
              className="profile-settings-sec right-sec"
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
