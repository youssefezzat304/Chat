import { User } from "@/app/utils/types/user.interfaces";
import DisplayImage from "../others/DisplayImage";
import { ComponentProps } from "react";
import { useChatStore } from "@/app/utils/stores/chat.store";
import { MessageInterface } from "@/app/utils/types/chat.interfaces";
import dayjs from "dayjs";

type SubjectProps = ComponentProps<"div"> & {
  subject: User;
  lastMessage?: MessageInterface;
};
const Subject = ({ subject, lastMessage }: SubjectProps) => {
  const setSelectedChatId = useChatStore((state) => state.setSelectedChatId);
  const { setChatWith, chatWith, selectedChatId } = useChatStore();

  const handleSelectChatId = () => {
    setChatWith(subject);
  };
  return (
    <main className="subject-main" onClick={handleSelectChatId}>
      <div className="subject-info">
        <DisplayImage
          className="friend-pp-container"
          variant="rounded"
          base64String={subject.profilePic}
          displayName={subject.displayName?.toUpperCase()}
        />
        <div className="mssg-info">
          <section className="top">
            <label htmlFor="">{subject.displayName}</label>
            <p className="lastseen">
              {dayjs(lastMessage?.updatedAt).format("MM/DD/YY 	h:mm A")}
            </p>
          </section>
          <section className="bottom">
            <p className="last-messege">{lastMessage?.content}</p>
            {/* <p className="notification-icon"></p> */}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Subject;
