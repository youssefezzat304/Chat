import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material";
import { ComponentProps } from "react";
import { MdClose } from "react-icons/md";

type AlertType = ComponentProps<"div"> & {
  message: string | undefined;
  title: string;
  type: "success" | "info" | "warning" | "error";
  clearErrors: any;
  watch: boolean;
};
const TextBoxAlert = ({
  message,
  title,
  type,
  clearErrors,
  watch,
  ...props
}: AlertType) => {
  return (
    <Collapse in={watch}>
      <Alert
        severity={type}
        className="addfriend-alert"
        variant="filled"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={clearErrors}
          >
            <MdClose fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Collapse>
  );
};

export default TextBoxAlert;
