import {MessagesSystem} from "@/app/dashboard/MessagesSystem";
import { BsMic, BsSearch, BsTelephone } from "react-icons/bs";
import { GoPaperclip } from "react-icons/go";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoSendSharp } from "react-icons/io5";

const Chat = () => {
  return (
    <main className="chat-main">
      <header className="chat-header">
        <div className="header-info">
          <label htmlFor="name">Desgin Chat</label>
          <p>23 members, 10 online</p>
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
        <div className="input-box">
          <GoPaperclip className="clip-icon" title="upload file"/>
          <BsMic className="mic-icon" title="voice note"/>
          <IoSendSharp className="send-icon"title="send"/>
          <input type="text" title="message" placeholder="Your message." />
        </div>
      </section>
    </main>
  );
}

export default Chat