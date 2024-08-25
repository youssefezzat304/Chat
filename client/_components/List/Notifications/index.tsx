import { Panel, PanelGroup } from "react-resizable-panels";
import { List } from "@mui/material";
import {  NotificationsHeader } from "@/_components";

import styles from "./index.module.css";

const Notifications = () => {
  const Notifications = [];
  return (
    <PanelGroup direction="vertical" className={styles.rightSec}>
      <Panel className={styles.thirdSec}>
        <NotificationsHeader />
        <List className={styles.listOfNotifications}>
          {/* <MessageNotification /> */}
        </List>
      </Panel>
    </PanelGroup>
  );
};

export default Notifications;
