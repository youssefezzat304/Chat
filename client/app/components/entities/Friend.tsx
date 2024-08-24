import { useFindChat } from "@/app/utils/queries/chat.query";
import { useChatStore } from "@/app/utils/stores";
import DisplayImage from "../others/DisplayImage";
import { User } from "@/app/utils/types/user.interfaces";

const Friend = ({ friend }: { friend: User }) => {
  const setChatWith = useChatStore((state) => state.setChatWith);
  const { isLoading } = useFindChat();

  const handleSelectChatId = () => {
    setChatWith(friend);
  };
  return (
    <main className="subject-main friend" onClick={handleSelectChatId}>
      <DisplayImage
        className="subject-pp-container"
        variant="rounded"
        base64String={friend.profilePic}
        displayName={friend.displayName?.toUpperCase()}
      />
      <section className="friend-name">
        <label htmlFor="">{friend.displayName}</label>
      </section>
    </main>
  );
};

export default Friend;
