import { ComponentProps } from 'react'
import ButtonIcon from '../../Icon/ButtonIcon';
import { IoSendSharp } from 'react-icons/io5';

import styles from "./index.module.css"

const SendMessageBtn = ({...props}: ComponentProps<"button">) => {
  return (
    <ButtonIcon
      className={styles.sendIcon}
      title="Send"
      onClick={props.onClick}
      icon={<IoSendSharp type="submit" />}
    ></ButtonIcon>
  );
}

export default SendMessageBtn