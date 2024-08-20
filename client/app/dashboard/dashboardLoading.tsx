import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import SideBarButtons from "../components/buttons/SideBarButtons";
import { CircularProgress } from "@mui/material";

export const DashboardLoading = () => {
  return (
    <section className="main">
      <div className="main-screen">
        <SideBarButtons />
        <PanelGroup direction="horizontal" autoSaveId="main">
          <Panel defaultSize={75} minSize={75} maxSize={75}>
            <section className="main-sec">
              <PanelGroup
                className="dashboard-main"
                direction="horizontal"
                autoSaveId="dashboard"
              >
                <CircularProgress
                  color="secondary"
                  className="circular-progress"
                />
              </PanelGroup>
            </section>
          </Panel>
          <PanelResizeHandle />
          <Panel defaultSize={25} minSize={25} maxSize={25}>
            <PanelGroup direction="vertical" className="right-sec">
              <Panel
                className="secondary-sec"
                defaultSize={50}
                minSize={50}
                maxSize={50}
              >
                <CircularProgress color="secondary" />
              </Panel>
              <PanelResizeHandle />
              <Panel
                className="third-sec"
                defaultSize={50}
                minSize={50}
                maxSize={50}
              >
                <CircularProgress color="secondary" />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </section>
  );
};
