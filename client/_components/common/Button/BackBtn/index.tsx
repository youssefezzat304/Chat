import { IoChevronBackOutline } from "react-icons/io5";
import ButtonIcon from "../../Icon/ButtonIcon";
import { ComponentProps } from "react";

const BackBtn = ({ ...props }: ComponentProps<"button">) => {
  return <ButtonIcon {...props} title="Back" icon={<IoChevronBackOutline />} />;
};

export default BackBtn;
