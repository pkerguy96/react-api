//@ts-nocheck
import {
  Paper,
  Box,
  Divider,
  TextField,
  Autocomplete,
  Button,
  Chip,
  Modal,
  IconButton,
  Typography,
} from "@mui/material";
import { items } from "../services/Medicines.json";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import getPatients from "../hooks/getPatients";
import LoadingSpinner from "../components/LoadingSpinner";
import { Patient } from "./AddPatientForm";
const AddOrdonanceUpdated = () => {
  const { data: patientsData, isLoading } = getPatients();
  const [drugs, setDrugs] = useState([]);
  const [drug, setDrug] = useState({});
  const [name, setName] = useState("");

  const onClose = () => setDrug({});

  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    reset,
    formState: { errors },
  } = useForm();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  let dataArray: Patient[] = [];
  if (
    patientsData &&
    typeof patientsData === "object" &&
    Object.keys(patientsData).length > 0
  ) {
    dataArray = Object.values(patientsData);
  }
  const onSubmit = (data) => {
    data.drugs = drugs;
    console.log(data);
  };

  const handleOpenModal = (index: number) => {
    console.log(drugs);
    const current = drugs[index];
    setDrug({
      id: current.id,
      name: current.name,
      note: current.note || "",
    });
  };

  return (
    <Paper className="p-4">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2"
      >
        <Box className="flex justify-center  text-lg  text-gray-400 uppercase">
          <span>Ajouter une ordonance LALIBERTI</span>
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
          <Box className={`w-full md:flex-1 `}>
            <Controller
              control={control}
              name="patient"
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  disablePortal
                  id="combo-box-demo"
                  options={dataArray}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  value={field.value || null}
                  getOptionLabel={(option) => `${option.nom} ${option.prenom}`}
                  renderInput={(params) => (
                    <TextField {...params} label="Patient" />
                  )}
                  onChange={(e, data) => {
                    setValue("patient", data); // Set the entire patient object as the value
                  }}
                />
              )}
            />
          </Box>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
          <label htmlFor="nom" className="w-full md:w-[160px]">
            Date:
          </label>
          <Box className="w-full md:flex-1">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker label="Date" sx={{ width: "100%" }} />
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
              value={name}
              inputProps={{ list: "browsers" }}
              onChange={(e) => {
                setName(e.target.value);
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
            onClick={() => {
              const valid = !drugs.some(
                (e) => e.name.toUpperCase() === name.toUpperCase()
              );
              if (valid) {
                setDrugs([
                  ...drugs,
                  { name: name, note: "", id: drugs.length },
                ]);
              }
              setName("");
            }}
          >
            Ajouter
          </Button>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
          <label htmlFor="nom" className="w-full md:w-[160px]">
            Sélectionné:
          </label>
          <Box className="w-full md:flex-1 flex-wrap">
            {drugs.map((e, i) => (
              <Chip
                variant="outlined"
                key={i}
                className="!mr-1 !my-1"
                label={e.name}
                onDelete={() => setDrugs(drugs.filter((e, j) => j !== i))}
                onClick={() => handleOpenModal(i)}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ marginTop: 5 }}>
          <Button
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
        open={Object.keys(drug || {}).length > 0}
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
            value={drug?.name}
            fullWidth
            label="Nom"
            id="Medicine-text"
            disabled
          />

          <TextField
            id="large-text"
            label="Note"
            value={drug?.note}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setDrug({ ...drug, note: e.target.value });
            }}
          />
          <Box className=" mx-4 w-full flex gap-4 justify-center	 ">
            <Button
              variant="contained"
              color="info"
              size="small"
              startIcon={<CheckCircleIcon />}
              onClick={() => {
                setDrugs(drugs.map((e) => (e.id === drug.id ? drug : e)));
                setDrug({});
              }}
            >
              Sauvegarder
            </Button>
          </Box>
        </Box>
      </Modal>
    </Paper>
  );
};

export default AddOrdonanceUpdated;
