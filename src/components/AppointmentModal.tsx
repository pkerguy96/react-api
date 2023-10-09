import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
  SelectChangeEvent,
  Autocomplete,
} from "@mui/material";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment"; // Import moment library
import getPatients from "../hooks/getPatients";
import { Patient } from "../pages/AddPatientForm";

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
  const [patient, setPatient] = React.useState<Patient>();
  const { data } = getPatients();
  let dataArray = [];
  if (data && typeof data === "object") {
    dataArray = Object.values(data);
  }

  const dateTimeMoment = moment(dateTime);
  const handlePatientChange = (_event: any, newValue: Patient) => {
    if (newValue) {
      // Update the state with the selected patient
      setPatient(newValue);
      console.log("Selected patient:", newValue);
      console.log("deja patient:", patient);
    } else {
      // Handle the case when nothing is selected
      setPatient(undefined);
      console.log("No patient selected");
    }
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center"
    >
      <Box
        sx={{ width: 400, bgcolor: "background.paper", p: 2 }}
        className="flex flex-col items-center gap-4 rounded-lg border-0"
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Détails du rendez-vous
        </Typography>

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={dataArray}
          getOptionLabel={(option) => option.nom}
          sx={{ width: " 100% " }}
          renderInput={(params) => <TextField {...params} label="Patient" />}
          onChange={handlePatientChange} // Handle changes
        />
        <TextField fullWidth label="Titre" id="title-text" />

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateTimePicker
            defaultValue={dateTimeMoment}
            ampm={false}
            sx={{ width: "100%" }}
          />
        </LocalizationProvider>

        <TextField
          id="large-text"
          label="Note"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
        />
        <Button variant="contained">Confirmer</Button>
      </Box>
    </Modal>
  );
};

export default AppointmentModal;
