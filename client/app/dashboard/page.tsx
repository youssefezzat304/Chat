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

  const tabs =
    notificationsTab.isOpen ||
    friendRequestsTab.isOpen ||
    chatInfoTab ||
    membersTab;

  if (!user) {
    return <RoutesLoading />;
  }
  return (
    <main className={styles.main}>
      <div className={styles.mainScreen}>
        {!isTablet && <NavBar />}
        <PanelGroup direction="horizontal" autoSaveId="main">
          <Panel defaultSize={tabs ? 75 : 100}>
            <section className={styles.mainSec}>
              <MainConsole />
            </section>
          </Panel>
          {tabs && (
            <>
              <PanelResizeHandle />
              {notificationsTab.isOpen || friendRequestsTab.isOpen ? (
                <Panel defaultSize={30} minSize={22} maxSize={30}>
                  {notificationsTab ? (
                    <Notifications />
                  ) : friendRequestsTab ? (
                    <FriendRequests />
                  ) : null}
                </Panel>
              ) : (
                <Panel defaultSize={25} maxSize={40} minSize={15}>
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
