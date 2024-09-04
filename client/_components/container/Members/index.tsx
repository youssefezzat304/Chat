"use client";
import { MembersInfo } from "@/_components";
import React from "react";
import { Panel } from "react-resizable-panels";

import styles from "./index.module.css";

const Members = () => {
  return (
    <Panel defaultSize={50} minSize={20} className={styles.membersContainer}>
      <MembersInfo />
    </Panel>
  );
};

export default Members;
