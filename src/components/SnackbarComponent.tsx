import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
interface SnackbarProps {
  isOpen: boolean;
  message: string;
  severity: string;
  onClose: () => void;
}
const SnackbarComponent: React.FC<SnackbarProps> = ({
  isOpen,
  message,
  severity,
  onClose,
}: SnackbarProps) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={onClose}
        severity={severity as AlertColor}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackbarComponent;
