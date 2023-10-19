//@ts-nocheck
import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment"; // Import moment library
import getPatients from "../hooks/getPatients";
import { Patient } from "../pages/AddPatientForm";

import { AxiosError } from "axios";
import { APIClient } from "../services/Http";

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
  const [snackBar, setSnackBar] = useState({
    isopen: false,
    message: "",
    severity: "warning",
  });
  const dateTimeMoment = moment(dateTime);
  const [patient, setPatient] = useState<Patient>();
  const [title, setTitle] = useState("");
  const [dateTimeValue, setDateTimeValue] = useState<string>();
  const [note, setNote] = useState("");
  const { data: patientsData } = getPatients();
  let dataArray = [];
  if (patientsData && typeof patientsData === "object") {
    dataArray = Object.values(patientsData);
  }

  if (open && !dateTimeValue) {
    setDateTimeValue(dateTimeMoment.format("YYYY-MM-DDTHH:mm:ss"));
  }

  const handlePatientChange = (_event: any, newValue: Patient) => {
    if (newValue) {
      // Update the state with the selected patient
      setPatient(newValue);
    } else {
      // Handle the case when nothing is selected
      setPatient(undefined);
    }
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };
  //@ts-ignore
  const handleDateTimeChange = (newDateTime) => {
    const combinedValue = newDateTime.format("YYYY-MM-DDTHH:mm:ss");

    setDateTimeValue(combinedValue); // Capture the selected date and time value
  };
  const onclicked = async () => {
    const formData: {
      patient_id: number;
      title: string;
      note: string;
      date: string;
    } = {
      patient_id: patient?.id,
      title: title,
      date: dateTimeValue,
      note: note,
    };
    try {
      const apiclient = new APIClient<Appointments>("/Appointment");
      const response = await apiclient.Postall(formData);
      /* THIS NEEDS TO CLOSE THE MODAL AND GIVE A POPER MSG  */
      console.log(response);
      console.log(formData);
    } catch (error: any) {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message
          : error.message;
      console.log(message);
    }
  };
  return (
    <>
      <Snackbar
        open={snackBar.isopen}
        autoHideDuration={3000} // Adjust the duration for how long the snackbar should be displayed
        onClose={() =>
          setSnackBar((prevState) => ({ ...prevState, isopen: false }))
        }
        anchorOrigin={{
          vertical: "top", // Set the vertical position to top
          horizontal: "right", // Set the horizontal position to right
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() =>
            setSnackBar((prevState) => ({ ...prevState, isopen: false }))
          }
          severity={snackBar.severity as AlertColor}
        >
          {snackBar.message}
        </MuiAlert>
      </Snackbar>
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
          <TextField
            fullWidth
            label="Titre"
            id="title-text"
            onChange={handleTitleChange}
          />

          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              defaultValue={dateTimeMoment}
              ampm={false}
              sx={{ width: "100%" }}
              onChange={handleDateTimeChange}
            />
          </LocalizationProvider>

          <TextField
            id="large-text"
            label="Note"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            onChange={handleNoteChange}
          />
          <Button variant="contained" onClick={onclicked}>
            Confirmer
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AppointmentModal;
