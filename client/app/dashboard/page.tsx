"use client";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
//----- Components --------------
import ChatInfo from "../components/windows/ChatInfo";
import Main from "../components/scenes/main";
import Members from "../components/windows/Members";
import SideBarButtons from "../components/buttons/SideBarButtons";
import Loading from "../components/scenes/loading";
import { DashboardLoading } from "./dashboardLoading";
import Notifications from "../components/windows/Notifications";
import FriendRequests from "../components/windows/FriendRequests";
import { useOpenTabsStore } from "../utils/stores/handleTabs.store";
import { useUserStore } from "../utils/stores/user.store";
import useAuthenticateUser from "../hooks/useAuthenticateUser";
//----- SVGs --------------------

export default function Home() {
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
              <Main />
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
