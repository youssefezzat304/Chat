"use client";
import { SyncLoader } from "react-spinners";
import { useThemeContext } from "@/contexts/ThemeContext";
import { LightBg, BlackBg } from "../../..";

import styles from "./index.module.css";

const RoutesLoading = () => {
  const { theme } = useThemeContext();

  return (
    <main className={`${styles.registerMain}`}>
      <SyncLoader />
      {theme ? <BlackBg className="bg" /> : <LightBg className="bg" />}
    </main>
  );
};

export default RoutesLoading;
