"use client";
import { SyncLoader } from "react-spinners";
import { useThemeContext } from "@/contexts/ThemeContext";
import { LightBg } from "../../..";

import styles from "./index.module.css";

const RoutesLoading = () => {
  const { theme } = useThemeContext();

  return (
    <main className={styles.registerMain}>
      <SyncLoader />
      <LightBg className={styles.bg} />
    </main>
  );
};

export default RoutesLoading;
