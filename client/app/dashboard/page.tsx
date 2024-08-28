"use client";
import {
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
import useMediaQuery from "@/hooks/useMediaQuery";

import styles from "./index.module.css";
import { useMemo } from "react";

export default function Dashboard() {
  const user = useUserStore((state) => state.user);
  const { isLoading } = useAuthenticateUser();
  const { isTablet } = useMediaQuery();

  const { friendRequestsTab, membersTab, chatInfoTab, notificationsTab } =
    useTabsStore((state) => ({
      friendRequestsTab: state.friendRequestsTab,
      membersTab: state.membersTab,
      chatInfoTab: state.chatInfoTab,
      notificationsTab: state.notificationsTab,
    }));

  const tabsOpen = useMemo(
    () =>
      notificationsTab.isOpen ||
      friendRequestsTab.isOpen ||
      chatInfoTab ||
      membersTab,
    [notificationsTab, friendRequestsTab, chatInfoTab, membersTab],
  );

  const Alerts = useMemo(
    () => (
      <Panel defaultSize={30} minSize={22} maxSize={30}>
        {notificationsTab.isOpen ? (
          <Notifications />
        ) : (
          friendRequestsTab.isOpen && <FriendRequests />
        )}
      </Panel>
    ),
    [notificationsTab.isOpen, friendRequestsTab.isOpen],
  );

  const Info = useMemo(
    () => (
      <Panel defaultSize={25} maxSize={40} minSize={15}>
        <PanelGroup direction="vertical" className={styles.rightSec}>
          {chatInfoTab && <ChatInfoContainer />}
          <PanelResizeHandle />
          {membersTab && <Members />}
        </PanelGroup>
      </Panel>
    ),
    [chatInfoTab, membersTab],
  );

  if (!user || isLoading) {
    return <RoutesLoading />;
  }
  return (
    <main className={styles.main}>
      <div className={styles.mainScreen}>
        {!isTablet && <NavBar />}
        <PanelGroup direction="horizontal" autoSaveId="main">
          <Panel defaultSize={tabsOpen ? 75 : 100}>
            <section className={styles.mainSec}>
              <MainConsole />
            </section>
          </Panel>
          {tabsOpen && (
            <>
              <PanelResizeHandle />
              {notificationsTab.isOpen || friendRequestsTab.isOpen
                ? Alerts
                : Info}
            </>
          )}
        </PanelGroup>
      </div>
    </main>
  );
}
