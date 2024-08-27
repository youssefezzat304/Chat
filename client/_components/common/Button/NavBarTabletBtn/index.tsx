import { ComponentProps, MouseEventHandler } from "react";

type NavBarBtnProps = {
  action?: MouseEventHandler<HTMLDivElement>;
  icon: JSX.Element;
  buttonProps: ComponentProps<"button">;
  divProps: ComponentProps<"div">;
};
const NavBarTabletBtn = ({
  action,
  icon,
  buttonProps,
  divProps,
}: NavBarBtnProps) => {
  return (
    <div {...divProps} onClick={action}>
      <button {...buttonProps}>{icon}</button>
      <span>{buttonProps.title}</span>
    </div>
  );
};

export default NavBarTabletBtn;
