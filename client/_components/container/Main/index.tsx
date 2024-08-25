"use client";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Chat from "../Chat";
import Chats from "../../List/Chats";
import { useTabsStore } from "@/utils/stores";
import Friends from "../../List/Friends";

import styles from "./index.module.css";

const Main = () => {
  const friendsTab = useTabsStore((state) => state.friendsTab);
  return (
    <PanelGroup
      className={styles.dashboardMain}
      direction="horizontal"
      autoSaveId="dashboard"
    >
      <Panel
        className={styles.friendList}
        title="Friends list"
        defaultSize={30}
        minSize={25}

      >
        {friendsTab ? <Friends /> : <Chats />}
      </Panel>
      <PanelResizeHandle />
      <Panel className={styles.chatSec} defaultSize={65} minSize={40}>
        <Chat />
      </Panel>
    </PanelGroup>
  );
};

export default Main;
