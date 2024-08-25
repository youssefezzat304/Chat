import { GoPaperclip } from "react-icons/go";
import ButtonIcon from "../../Icon/ButtonIcon";

import styles from "./index.module.css";

const AttachBtn = () => {
  return (
    <ButtonIcon
      title="Attach"
      className={styles.attachIcon}
      icon={<GoPaperclip />}
    ></ButtonIcon>
  );
};

export default AttachBtn;
