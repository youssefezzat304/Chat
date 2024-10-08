import { Panel, PanelGroup } from "react-resizable-panels";
import { List } from "@mui/material";
import { NotificationsHeader } from "@/_components";

import styles from "./index.module.css";

const Notifications = () => {
  const Notifications = [];
  return (
    <PanelGroup direction="vertical" className={styles.main}>
      <Panel className={styles.container}>
        <NotificationsHeader />
        <List className={styles.listOfNotifications}>
          {/* <MessageNotification /> */}
        </List>
      </Panel>
    </PanelGroup>
  );
};

export default Notifications;
