import React from "react";
import ButtonIcon from "../../Icon/ButtonIcon";
import { BsMic } from "react-icons/bs";

import styles from "./index.module.css";

const VoiceNoteBtn = () => {
  return (
    <ButtonIcon
      className={styles.micIcon}
      title="Voice note"
      icon={<BsMic />}
    ></ButtonIcon>
  );
};

export default VoiceNoteBtn;
