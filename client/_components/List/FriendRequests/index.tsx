import { Panel, PanelGroup } from "react-resizable-panels";
import NotificationsHeader from "../../Header/NotificationsHeader";
import { List } from "@mui/material";
import { FriendRequestNotification } from "../..";
import { useEffect, useState } from "react";
import { useUserStore } from "@/utils/stores";

import styles from "./index.module.css";

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState<
    Array<{ displayName: string; _id: string }> | null | undefined
  >(null);

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      setFriendRequests(user.friendRequestsReceived);
    }
  }, [user]);

  return (
    <PanelGroup direction="vertical" className={styles.righSec}>
      <Panel className={styles.thirdSec}>
        <NotificationsHeader />
        <List className={styles.listOfNotifications}>
          {friendRequests?.map((request, index) => {
            return (
              <FriendRequestNotification
                key={index}
                request={request}
                recipientId={user?._id}
                requesterId={request._id}
              />
            );
          })}
        </List>
      </Panel>
    </PanelGroup>
  );
};

export default FriendRequests;
