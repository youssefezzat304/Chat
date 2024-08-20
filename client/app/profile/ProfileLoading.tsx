import { Panel, PanelGroup } from "react-resizable-panels";
import SideBarButtons from "../components/buttons/SideBarButtons";
import { CircularProgress } from "@mui/material";

const ProfileLoading = () => {
  return (
    <main className="main">
      <div className="main-screen">
        <SideBarButtons />
        <PanelGroup direction="horizontal" autoSaveId="main">
          <Panel defaultSize={75} minSize={75}>
            <div className="main-profile-sec">
              <CircularProgress
                color="secondary"
                className="circular-progress"
              />
            </div>
          </Panel>
          <Panel
            className="profile-settings-sec right-sec"
            defaultSize={25}
            minSize={25}
            maxSize={25}
          >
            <CircularProgress color="secondary" className="circular-progress" />
          </Panel>
        </PanelGroup>
      </div>
    </main>
  );
};

export default ProfileLoading;
