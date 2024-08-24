import { BsSearch, BsTelephone } from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Icon } from "./NotificationsHeader";
import ChatDropMenu from "../others/ChatDropMenu";

const ChatHeader = () => {
  return (
    <main className="header-icons">
      <Icon title="Search" icon={<BsSearch />} />
      <Icon title="Voice call" icon={<BsTelephone />} />
      <ChatDropMenu />
    </main>
  );
};

export default ChatHeader;
