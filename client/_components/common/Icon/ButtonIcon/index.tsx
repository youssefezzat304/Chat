import { IconProps } from "@/types/props.types";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";

export const ButtonIcon = ({ title, icon, ...props }: IconProps) => {
  return (
    <section className={props.className}>
      <Tooltip title={title}>
        <IconButton onClick={props.onClick}>{icon}</IconButton>
      </Tooltip>
    </section>
  );
};

export default ButtonIcon;
