import { MessagesSystem } from "@/app/dashboard/MessagesSystem";
import { useHandleChat } from "@/app/utils/queries/chat.query";
import { useChatStore } from "@/app/utils/stores/chat.store";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { BsSearch, BsTelephone } from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import MessageInput from "../inputs/MessageInput";

const PrivateChat = () => {
  const setChatInfo = useChatStore((state) => state.setChatInfo);
  const currentChat = useChatStore((state) => state.chatInfo);
  const { chatInfo, isLoading } = useHandleChat();
  useEffect(() => {
    setChatInfo(chatInfo?.data);
  }, [chatInfo, setChatInfo, currentChat]);
  return (
    <>
      {isLoading ? (
        <CircularProgress color="secondary" />
      ) : (
        <>
          <header className="chat-header">
            <div className="header-info">
              <label htmlFor="name">
                {currentChat?.participants[0].displayName}
              </label>
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
      )}
    </>
  );
};

export default PrivateChat;
