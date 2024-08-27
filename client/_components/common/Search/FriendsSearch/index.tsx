import { CiSearch } from "react-icons/ci";
import BurgerMenuBtn from "../../Button/BurgerMenuBtn";
import useMediaQuery from "@/hooks/useMediaQuery";
import GenericInput from "../../Input/GenericInput";
import useTabletStore from "@/utils/stores/tablet.store";
import { useTabsStore } from "@/utils/stores";

import styles from "./index.module.css";

const FriendsSearch = () => {
  const { isTablet } = useMediaQuery();
  const setTabletNavBar = useTabletStore((state) => state.setTabletNavBar);
  const setFriendsTab = useTabsStore((state) => state.setFriendsTab);

  const openNavBar = () => {
    setFriendsTab(false);
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
