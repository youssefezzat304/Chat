import { CiSearch } from "react-icons/ci";

import styles from "./index.module.css";
import BurgerMenuBtn from "../../Button/BurgerMenuBtn";
import useIsTablet from "@/hooks/MediaQuery/useIsTablet";
import GenericInput from "../../Input/GenericInput";
import useTabletStore from "@/utils/stores/tablet.store";

const FriendsSearch = () => {
  const { isTablet } = useIsTablet();
  const setTabletNavBar = useTabletStore((state) => state.setTabletNavBar);

  const openNavBar = () => {
    setTabletNavBar(true);
  };
  return (
    <main className={styles.friendsSearchMain}>
      {isTablet && (
        <BurgerMenuBtn className={styles.burgerMenu} onClick={openNavBar} />
      )}
      <GenericInput
        divProps={{ className: styles.searchBarContainer, title: "Search" }}
        inputProps={{
          placeholder: "Search",
          className: styles.friendsSearchBar,
        }}
        icons={<CiSearch className={styles.friendsSearchIcon} />}
      />
    </main>
  );
};

export default FriendsSearch;
