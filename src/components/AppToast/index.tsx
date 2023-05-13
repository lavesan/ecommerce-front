import { Alert, Snackbar } from "@mui/material";

interface IAppToastProps {
  isOpen: boolean;
  onClose: VoidFunction;
  status: "success" | "info" | "warning" | "error";
  message: string;
}

export const AppToast = ({
  isOpen,
  status,
  message,
  onClose,
}: IAppToastProps) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
    >
      <Alert onClose={onClose} severity={status} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
