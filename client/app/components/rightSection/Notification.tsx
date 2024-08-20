import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

export type NotificationProps = {
  displayName?: string;
  photo?: string;
  time?: string;
  primaryLabel?: string;
  message?: string;
  recipientId?: string;
  requesterId?: string;
  request?: any;
};
export const Notification = ({
  primaryLabel,
  message,
  displayName,
  photo,
  time,
}: NotificationProps) => {
  return (
    <ListItem alignItems="flex-start" className="notification">
      <ListItemAvatar sx={{ margin: "0", marginTop: "4px" }}>
        <Avatar alt={displayName} src={photo} variant="rounded" />
      </ListItemAvatar>
      <ListItemText
        primary={primaryLabel}
        secondary={
          <Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {time}
            </Typography>
            {message}
          </Fragment>
        }
      />
    </ListItem>
  );
};
