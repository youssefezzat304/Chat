"use client";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Chat from "../windows/Chat";
import Chats from "../friendListSection/Chats";
import { useTabsStore } from "@/app/utils/stores";
import Friends from "../friendListSection/Friends";

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
      <Panel className="chat-sec" title="Chat" defaultSize={65} minSize={40}>
        <Chat />
      </Panel>
    </PanelGroup>
  );
};

export default Home;
