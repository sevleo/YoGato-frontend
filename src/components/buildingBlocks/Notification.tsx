import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";

interface Notification {
  open: boolean;
  message: string;
  handleClose: () => void;
  severity: any;
}

export default function Notification({
  open,
  message,
  handleClose,
  severity,
}: Notification) {
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        autoHideDuration={3500}
        key={"top" + "center"}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
          action={false}
        >
          {message}{" "}
        </Alert>
      </Snackbar>
    </>
  );
}
