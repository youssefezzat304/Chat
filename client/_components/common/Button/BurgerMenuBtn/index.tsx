import { CiMenuBurger } from "react-icons/ci";
import ButtonIcon from "../../Icon/ButtonIcon";
import { ComponentProps } from "react";

const BurgerMenuBtn = ({ ...props }: ComponentProps<"button">) => {
  return <ButtonIcon {...props} title="" icon={<CiMenuBurger />} />;
};

export default BurgerMenuBtn;
