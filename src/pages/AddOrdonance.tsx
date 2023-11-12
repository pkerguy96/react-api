import {
  Paper,
  Box,
  TextField,
  Button,
  Divider,
  Autocomplete,
  Chip,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearIcon from "@mui/icons-material/Clear";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import AddIcon from "@mui/icons-material/Add";

import getPatients from "../hooks/getPatients";
import { Patient } from "./AddPatientForm";
import { useEffect, useState } from "react";
import { items } from "../services/Medicines.json";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import addOrdonance from "../hooks/addOrdonance";

import { AxiosError } from "axios";
import SnackbarComponent from "../components/SnackbarComponent";
import { useNavigate, useParams } from "react-router";
import getOrdonance from "../hooks/getOrdonance";
import { Ordonance } from "../services/OrdonanceService";

const AddOrdonance = () => {
  const today = moment();
  const { data: patientsData } = getPatients();
  const [patient, setPatient] = useState<Patient>();
  const [selectedMedicines, setSelectedMedicines] = useState<
    { medicine_name: string; note: string }[]
  >([]);
  const [modalMedicineName, setModalMedicineName] = useState("");
  const [noteValue, setNoteValue] = useState("");
  const [medicineValue, setMedicineValue] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedMedicineIndex, setSelectedMedicineIndex] = useState(-1);
  const [selectedDate, setSelectedDate] = useState(today);
  const mutation = addOrdonance();

  const navigate = useNavigate();
  const [snackBar, setSnackBar] = useState({
    isOpen: false,
    message: "",
    severity: "info",
  });
  // adding patient if existed
  let dataArray: Patient[] = [];

  if (
    patientsData &&
    typeof patientsData === "object" &&
    Object.keys(patientsData).length > 0
  ) {
    dataArray = Object.values(patientsData);
  }
  const handlePatientChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: Patient | null
  ) => {
    if (newValue) {
      setPatient(newValue);
    } else {
      setPatient(undefined);
    }
  };
  const handleDelete = (index: number) => {
    const updatedSelectedMedicines = [...selectedMedicines];
    updatedSelectedMedicines.splice(index, 1);
    setSelectedMedicines(updatedSelectedMedicines);
  };
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleMedicineSelection = () => {
    if (
      medicineValue &&
      !selectedMedicines.some((item) => item.medicine_name === medicineValue)
    ) {
      const newMedicine = { medicine_name: medicineValue, note: "" };
      setSelectedMedicines([...selectedMedicines, newMedicine]);

      setMedicineValue("");
    }
  };
  const handleOpenModal = (medicinename: string, index: number) => {
    const selectedMedicine = selectedMedicines[index];
    setNoteValue(selectedMedicine ? selectedMedicine.note : "");
    setSelectedMedicineIndex(index);
    setModalMedicineName(medicinename);
    setOpen(true);
  };
  const handleSaveNote = () => {
    if (selectedMedicineIndex !== -1) {
      const updatedMedicines = [...selectedMedicines];
      updatedMedicines[selectedMedicineIndex] = {
        medicine_name: updatedMedicines[selectedMedicineIndex].medicine_name,
        note: noteValue,
      };
      setSelectedMedicines(updatedMedicines);
      setNoteValue("");
      setOpen(false);
    }
  };
  const onclicked = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // Adjust the locale as needed
    // Check if patient is undefined or null
    if (!patient || !selectedDate) {
      return;
    }
    // Check if selectedMedicines is undefined or empty
    if (!selectedMedicines || selectedMedicines.length === 0) {
      console.error("No selected medicines.");
      return;
    }
    const formData = {
      patient_id: patient?.id,
      medicine: selectedMedicines,
      date: selectedDate.format("YYYY-MM-DD"),
    };
    try {
      mutation.mutateAsync(formData, {
        onSuccess: () => {
          setSnackBar({
            isOpen: true,
            message: "Ordonnance créée avec succès",
            severity: "success",
          });
        },
        onError: (error: any) => {
          const message =
            error instanceof AxiosError
              ? error.response?.data?.message
              : error.message;

          setSnackBar({
            isOpen: true,
            message: message,
            severity: "warning",
          });
        },
      });
    } catch (error: any) {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message
          : error.message;
      setSnackBar({
        isOpen: true,
        message: message,
        severity: "warning",
      });
    }
  };
  useEffect(() => {
    let timerId: number;
    if (snackBar.isOpen) {
      timerId = setTimeout(() => {
        navigate("/Ordonnance");
      }, 2000); // 2 seconds

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [snackBar.isOpen]);
  const onClose = () => setOpen(false);

  return (
    <Paper className="p-4">
      <SnackbarComponent
        isOpen={snackBar.isOpen}
        message={snackBar.message}
        severity={snackBar.severity}
        onClose={() =>
          setSnackBar((prevState) => ({ ...prevState, isOpen: false }))
        }
      />
      <Box
        component="form"
        noValidate
        autoComplete="off"
        /*   onSubmit={handleSubmit(onSubmit)} */
        className="w-full flex flex-col gap-2"
      >
        <Box className="flex justify-center  text-lg  text-gray-400 uppercase">
          <span>Ajouter une ordonance</span>
        </Box>
        <Divider
          orientation="horizontal"
          flexItem
          className="gap-2 mb-4"
          variant="middle"
        />
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
          <label htmlFor="nom" className="w-full md:w-[160px]">
            Patient:
          </label>
          <Box className="w-full md:flex-1">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={dataArray}
              getOptionLabel={(option) => `${option.nom} ${option.prenom}`}
              sx={{ width: " 100% " }}
              renderInput={(params) => (
                <TextField {...params} label="Patient" />
              )}
              onChange={handlePatientChange}
            />
          </Box>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
          <label htmlFor="nom" className="w-full md:w-[160px]">
            Date:
          </label>
          <Box className="w-full md:flex-1">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Date"
                defaultValue={selectedDate}
                onChange={handleDateChange}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
          <label htmlFor="nom" className="w-full md:w-[160px]">
            Médicament:
          </label>
          <Box className="w-full md:flex-1">
            <TextField
              className="w-full"
              id="outlined-basic"
              label="Medicament"
              variant="outlined"
              value={medicineValue}
              inputProps={{ list: "browsers" }}
              onChange={(e) => {
                setMedicineValue(e.target.value);
              }}
            />
            <datalist id="browsers">
              {items.map((e, i) => (
                <option key={i} value={e} />
              ))}
            </datalist>
          </Box>
          <Button
            sx={{ borderRadius: 16 }}
            variant="outlined"
            endIcon={<AddIcon />}
            onClick={handleMedicineSelection}
          >
            Ajouter
          </Button>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
          <label htmlFor="nom" className="w-full md:w-[160px]">
            Sélectionné:
          </label>
          <Box className="w-full md:flex-1 flex-wrap  ">
            {selectedMedicines.map((item, index) => (
              <Chip
                key={index}
                label={item.medicine_name}
                variant="outlined"
                className="!mr-1 !my-1"
                onClick={() => handleOpenModal(item.medicine_name, index)}
                onDelete={() => handleDelete(index)}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ marginTop: 5 }}>
          <Button
            onClick={(e) => onclicked(e)}
            type="submit"
            variant="contained"
            sx={{ borderRadius: 16 }}
            fullWidth={true}
          >
            Enregistrer
          </Button>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <Box
          sx={{ width: 400, bgcolor: "background.paper", p: 2 }}
          className="flex flex-col items-center gap-3 rounded-lg border-0"
        >
          <Box className=" w-full flex flex-row justify-end">
            <IconButton onClick={() => onClose()}>
              <ClearIcon />
            </IconButton>
          </Box>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Médicament
          </Typography>

          <TextField
            fullWidth
            label="Nom"
            id="Medicine-text"
            disabled
            value={modalMedicineName}
          />

          <TextField
            id="large-text"
            label="Note"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={noteValue}
            onChange={(e) => setNoteValue(e.target.value)}
          />
          <Box className=" mx-4 w-full flex gap-4 justify-center	 ">
            <Button
              variant="contained"
              color="info"
              size="small"
              onClick={handleSaveNote}
              startIcon={<CheckCircleIcon />}
            >
              Sauvegarder
            </Button>
          </Box>
        </Box>
      </Modal>
    </Paper>
  );
};

export default AddOrdonance;
