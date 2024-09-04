"use client";
import { SyncLoader } from "react-spinners";
import { LightBg } from "../../..";

import styles from "./index.module.css";

const RoutesLoading = () => {
  return (
    <main className={styles.registerMain}>
      <SyncLoader />
      <LightBg className={styles.bg} />
    </main>
  );
};

export default RoutesLoading;
