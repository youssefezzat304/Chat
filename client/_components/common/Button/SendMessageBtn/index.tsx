import { ComponentProps } from "react";
import ButtonIcon from "../../Icon/ButtonIcon";
import { IoSendSharp } from "react-icons/io5";

import styles from "./index.module.css";

const SendMessageBtn = ({
  iconClass,
  ...props
}: ComponentProps<"button"> & {
  iconClass: string | undefined;
}) => {
  return (
    <ButtonIcon
      {...props}
      title="Send"
      icon={<IoSendSharp type="submit" className={iconClass} />}
    ></ButtonIcon>
  );
};

export default SendMessageBtn;
