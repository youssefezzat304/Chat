"use client";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Chat from "../tabs/Chat";
import Chats from "../tabs/Chats";
import { useTabsStore } from "@/app/utils/stores";
import Friends from "../tabs/Friends";

const Home = () => {
  const friendsTab = useTabsStore((state) => state.friendsTab);
  return (
    <PanelGroup
      className="dashboard-main"
      direction="horizontal"
      autoSaveId="dashboard"
    >
      <Panel
        className="friend-list"
        title="Friends list"
        defaultSize={35}
        minSize={30}
      >
        {friendsTab ? <Friends /> : <Chats />}
      </Panel>
      <PanelResizeHandle />
      <Panel className="chat-sec" defaultSize={65} minSize={40}>
        <Chat />
      </Panel>
    </PanelGroup>
  );
};

export default Home;
