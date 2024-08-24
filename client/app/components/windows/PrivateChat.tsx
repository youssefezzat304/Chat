import { MessagesSystem } from "@/app/dashboard/MessagesSystem";
import { useChatStore } from "@/app/utils/stores";
import { BsSearch, BsTelephone } from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import MessageInput from "../inputs/MessageInput";

const PrivateChat = () => {
  const chatWith = useChatStore((state) => state.chatWith);

  return (
    <>
      <header className="chat-header">
        <div className="header-info">
          <label htmlFor="name">{chatWith?.displayName}</label>
          <p>Online</p>
        </div>
        <div className="header-icons">
          <BsSearch />
          <BsTelephone />
          <HiOutlineDotsVertical />
        </div>
      </header>
      <section className="chat-console">
        <MessagesSystem />
      </section>
      <section className="chat-input">
        <MessageInput />
      </section>
    </>
  );
};

export default PrivateChat;
