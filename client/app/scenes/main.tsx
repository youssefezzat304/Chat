"use client";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
//----- Components --------------
import Chat from "../components/windows/Chat";
import Chats from "../components/friendListSection/Chats";
import { useOpenTabsStore } from "../utils/stores/handleTabs.store";
import Friends from "../components/friendListSection/Friends";

const Main = () => {
  const friendsTab = useOpenTabsStore((state) => state.friendsTab);
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

export default Main;
