"use client";
import {
  ChatInfo,
  Notifications,
  FriendRequests,
  RoutesLoading,
  MainConsole,
  NavBar,
  Members,
} from "../../_components";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useTabsStore, useUserStore } from "../../utils/stores";
import useAuthenticateUser from "../../hooks/useAuthenticateUser";
import ChatInfoContainer from "@/_components/container/ChatInfoContainer";
import styles from "./index.module.css";

export default function Dashboard() {
  const user = useUserStore((state) => state.user),
    { isLoading } = useAuthenticateUser(),
    friendRequestsTab = useTabsStore((state) => state.friendRequestsTab),
    membersTab = useTabsStore((state) => state.membersTab),
    chatInfoTab = useTabsStore((state) => state.chatInfoTab),
    notificationsTab = useTabsStore((state) => state.notificationsTab);

  const tabs =
    notificationsTab || friendRequestsTab || chatInfoTab || membersTab;

  if (!user) {
    return <RoutesLoading />;
  }
  return (
    <main className={styles.main}>
      <div className={styles.mainScreen}>
        <NavBar />
        <PanelGroup direction="horizontal" autoSaveId="main">
          <Panel defaultSize={tabs ? 75 : 100}>
            <section className={styles.mainSec}>
              <MainConsole />
            </section>
          </Panel>
          {tabs && (
            <>
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
                <Panel defaultSize={25} maxSize={40} minSize={15} collapsible>
                  <PanelGroup direction="vertical" className={styles.rightSec}>
                    {chatInfoTab && <ChatInfoContainer />}
                    <PanelResizeHandle />
                    {membersTab && <Members />}
                  </PanelGroup>
                </Panel>
              )}
            </>
          )}
        </PanelGroup>
      </div>
    </main>
  );
}
