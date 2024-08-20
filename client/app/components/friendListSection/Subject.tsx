import { CurrentUser } from "@/app/utils/types/user.interfaces";
import DisplayImage from "../others/DisplayImage";
import { ComponentProps } from "react";
import { useChatStore } from "@/app/utils/stores/chat.store";

type SubjectProps = ComponentProps<"div"> & {
  subject: CurrentUser;
};
const Subject = ({ subject, ...props }: SubjectProps) => {
  const setSelectedChatId = useChatStore((state) => state.setSelectedChatId);
  const handleSelectChatId = () => {
    setSelectedChatId(subject._id as string);
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
            <p className="lastseen">4m</p>
          </section>
          <section className="bottom">
            <p className="last-messege">gamed el kalam</p>
            <p className="notification-icon">1</p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Subject;
