"use client";
import {
  ChatInfo,
  Members,
  Notifications,
  FriendRequests,
} from "../components/windows";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import SideBarButtons from "../components/buttons/SideBarButtons";
import { Loading, Home } from "../components/scenes";
import { DashboardLoading } from "./dashboardLoading";
import { useOpenTabsStore } from "../utils/stores/handleTabs.store";
import { useUserStore } from "../utils/stores/user.store";
import useAuthenticateUser from "../hooks/useAuthenticateUser";

export default function Dashboard() {
  const user = useUserStore((state) => state.user);
  const { isLoading } = useAuthenticateUser();
  const friendRequestsTab = useOpenTabsStore(
    (state) => state.friendRequestsTab
  );
  const notificationsTab = useOpenTabsStore((state) => state.notificationsTab);

  if (isLoading) {
    return <DashboardLoading />;
  }
  if (!user) {
    return <Loading />;
  }

  return (
    <main className="main">
      <div className="main-screen">
        <SideBarButtons />
        <PanelGroup direction="horizontal" autoSaveId="main">
          <Panel defaultSize={75}>
            <section className="main-sec">
              <Home />
            </section>
          </Panel>
          <PanelResizeHandle />
          {notificationsTab || friendRequestsTab ? (
            <Panel defaultSize={30} minSize={22} maxSize={30}>
              {notificationsTab ? (
                <Notifications />
              ) : friendRequestsTab ? (
                <FriendRequests />
              ) : null}
            </Panel>
          ) : (
            <Panel defaultSize={25} minSize={15} maxSize={40}>
              <PanelGroup direction="vertical" className="right-sec">
                <Panel className="secondary-sec" defaultSize={50} minSize={20}>
                  <ChatInfo />
                </Panel>
                <PanelResizeHandle />
                <Panel className="third-sec" defaultSize={50} minSize={20}>
                  <Members />
                </Panel>
              </PanelGroup>
            </Panel>
          )}
        </PanelGroup>
      </div>
    </main>
  );
}
