import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { DateComponent } from "@fullcalendar/core/internal";

interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
  dateTime: string;
}

const AppointmentModal: React.FC<ModalComponentProps> = ({
  open,
  onClose,
  dateTime,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center"
    >
      <Box
        sx={{ width: 300, bgcolor: "background.paper", p: 2 }}
        className="flex flex-col items-center gap-4 rounded-lg border-0"
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Veuillez choisir une date
        </Typography>
        <TextField type="datetime-local" value={dateTime} />
        <TextField
          id="large-text"
          label="Note"
          multiline
          rows={5}
          variant="outlined"
          fullWidth
        />
        <Button variant="contained">Confirmer</Button>
      </Box>
    </Modal>
  );
};

export default AppointmentModal;
