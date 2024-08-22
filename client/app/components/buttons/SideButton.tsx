import { ComponentProps } from "react";
type SideButtonProps = ComponentProps<"button"> & {
  icon: JSX.Element;
};
const SideButton = ({ icon, ...props }: SideButtonProps) => {
  return (
    <button
      className="side-Btn"
      type={!props.type ? "button" : props.type}
      title={props.title}
      onClick={props.onClick}
    >
      {icon}
      {props.title}
    </button>
  );
};

export default SideButton;
