import { useUserStore } from "@/app/utils/stores";
import SearchBar from "../others/SearchBar";
import { User } from "@/app/utils/types/user.interfaces";
import Friend from "../entities/Friend";

const Friends = () => {
  const currentUser = useUserStore((state) => state.user);

  return (
    <main className="friendList-main">
      <SearchBar />
      <div className="friend-list">
        {currentUser?.friends?.map((friend: User) => {
          return <Friend key={friend._id} friend={friend} />;
        })}
      </div>
    </main>
  );
};

export default Friends;
