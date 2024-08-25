import { ComponentProps } from "react";
import styles from "./index.module.css";
type NavBarBtnProps = ComponentProps<"button"> & {
  icon: JSX.Element;
};
const NavBarBtn = ({ icon, ...props }: NavBarBtnProps) => {
  return (
    <button
      className={styles.sideBtn}
      type={!props.type ? "button" : props.type}
      title={props.title}
      onClick={props.onClick}
    >
      {icon}
      {props.title}
    </button>
  );
};

export default NavBarBtn;
