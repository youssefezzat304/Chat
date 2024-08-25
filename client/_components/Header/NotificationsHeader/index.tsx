import ButtonIcon from "@/_components/common/Icon/ButtonIcon";
import { useTabsStore } from "@/utils/stores";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { IoClose, IoSettings } from "react-icons/io5";
import { PiListFill } from "react-icons/pi";
import { TbAlertSquareRoundedFilled } from "react-icons/tb";

import styles from "./index.module.css";

const NotificationsHeader = () => {
  const openNotificationsTab = useTabsStore(
    (state) => state.openNotificationsTab
  );
  const openFriendRequestsTab = useTabsStore(
    (state) => state.openFriendRequestsTab
  );
  const closeNotifications = useTabsStore((state) => state.closeNotifications);
  return (
    <main className={styles.notificationsSec}>
      <header>
        <ButtonIcon title="All" icon={<PiListFill className="icon" />} />
        <ButtonIcon
          title="Messages"
          icon={<BiSolidMessageSquareDots className="icon" />}
          onClick={openNotificationsTab}
        />
        <ButtonIcon
          title="Friend Requests"
          icon={<FaUserFriends className="icon" />}
          onClick={openFriendRequestsTab}
        />
        <ButtonIcon
          title="Alerts"
          icon={<TbAlertSquareRoundedFilled className="icon" />}
        />
        <ButtonIcon title="Settings" icon={<IoSettings className="icon" />} />
        <ButtonIcon
          title="Close"
          icon={<IoClose className="icon" />}
          onClick={closeNotifications}
        />
      </header>
    </main>
  );
};

export default NotificationsHeader;
