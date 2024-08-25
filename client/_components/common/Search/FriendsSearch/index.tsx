import { CiSearch } from "react-icons/ci";

import styles from "./index.module.css";

const FriendsSearch = () => {
  return (
    <main className={`${styles.friendsSearchMain}`}>
      <CiSearch className={`${styles.friendsSearchIcon}`} />
      <input
        className={`${styles.friendsSearchBar}`}
        type="search"
        title="Search"
        placeholder="Search"
      />
    </main>
  );
};

export default FriendsSearch;
