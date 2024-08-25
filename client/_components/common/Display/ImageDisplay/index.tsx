import { ImageDisplayProps } from "@/types/props.types";
import { Avatar } from "@mui/material";

const ImageDisplay = ({
  base64String,
  variant,
  displayName,
  ...props
}: ImageDisplayProps) => {
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

export default ImageDisplay;
