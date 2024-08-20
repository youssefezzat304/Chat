import { Avatar } from "@mui/material";
import React, { ComponentProps } from "react";

type DisplayImageProps = ComponentProps<"img"> & {
  base64String: string;
  displayName?: string;
  variant?: "circular" | "rounded" | "square";
};
const DisplayImage = ({
  base64String,
  variant,
  displayName,
  ...props
}: DisplayImageProps) => {
  const dataUrl = base64String;

  return (
    <div className={props.className}>
      <Avatar
        variant={variant}
        src={dataUrl}
        alt={displayName}
        className="profile-pic"
      ></Avatar>
    </div>
  );
};

export default DisplayImage;
