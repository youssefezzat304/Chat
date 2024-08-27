import { Alert, Snackbar } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

const SaveChangesAlert = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{
          width: "100%",
        }}
      >
        Changes saved successfully!
      </Alert>
    </Snackbar>
  );
};

export default SaveChangesAlert;
