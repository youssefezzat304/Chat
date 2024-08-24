import { Panel, PanelGroup } from "react-resizable-panels";
import NotificationsHeader from "../headers/NotificationsHeader";
import { List } from "@mui/material";
import { FriendRequestNotification } from "..";
import { useEffect, useState } from "react";
import { useUserStore } from "@/app/utils/stores";

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState<
    [{ displayName: string; _id: string }] | null | undefined
  >(null);

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    setFriendRequests(user?.friendRequestsReceived);
  }, [user]);

  return (
    <PanelGroup direction="vertical" className="right-sec">
      <Panel className="third-sec justify-start ">
        <NotificationsHeader />
        <List className="listOfNotifications">
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
