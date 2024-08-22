import { useOpenTabsStore } from "@/app/utils/stores/handleTabs.store";
import { IconButton, Tooltip } from "@mui/material";
import React, { ComponentProps, ReactNode } from "react";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { PiListFill } from "react-icons/pi";
import { TbAlertSquareRoundedFilled } from "react-icons/tb";

const NotificationsHeader = () => {
  const openNotificationsTab = useOpenTabsStore(
    (state) => state.openNotificationsTab,
  );
  const openFriendRequestsTab = useOpenTabsStore(
    (state) => state.openFriendRequestsTab,
  );
  return (
    <main className="notifications-sec">
      <header>
        <Icon title="All" icon={<PiListFill className="icon" />} />
        <Icon
          title="Messages"
          icon={<BiSolidMessageSquareDots className="icon" />}
          onClick={openNotificationsTab}
        />
        <Icon
          title="Friend Requests"
          icon={<FaUserFriends className="icon" />}
          onClick={openFriendRequestsTab}
        />
        <Icon
          title="Alerts"
          icon={<TbAlertSquareRoundedFilled className="icon" />}
        />
        <Icon title="Settings" icon={<IoSettings className="icon" />} />
      </header>
    </main>
  );
};

type IconProps = ComponentProps<"button"> & {
  title: string;
  icon: ReactNode;
};
export const Icon = ({ title, icon, ...props }: IconProps) => {
  return (
    <section className={props.className}>
      <Tooltip title={title}>
        <IconButton onClick={props.onClick}>{icon}</IconButton>
      </Tooltip>
    </section>
  );
};
export default NotificationsHeader;
