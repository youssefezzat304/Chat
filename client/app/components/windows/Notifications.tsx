import { Panel, PanelGroup } from "react-resizable-panels";
import { Notification } from "../rightSection/Notification";
import NotificationsHeader from "../rightSection/NotificationsHeader";
import { List } from "@mui/material";

const Notifications = () => {
  const Notifications = [];
  return (
      <PanelGroup direction="vertical" className="right-sec">
        <Panel className="third-sec justify-start ">
          <NotificationsHeader />
          <List className="listOfNotifications">
            <Notification />
          </List>
        </Panel>
      </PanelGroup>
  );
};

export default Notifications;