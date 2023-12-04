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
  FormControl,
} from "@mui/material";
import { items } from "../services/Medicines.json";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import getPatients from "../hooks/getPatients";
import LoadingSpinner from "../components/LoadingSpinner";
import { Patient } from "./AddPatientForm";
import { useNavigate, useParams } from "react-router";
import updateOrdonance from "../hooks/updateOrdonance";
import { AxiosError } from "axios";
import addOrdonance from "../hooks/addOrdonance";
import SnackbarComponent from "../components/SnackbarComponent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
const AddOrdonanceUpdated = () => {
  const Addmutation = addOrdonance();
  const mutation = updateOrdonance();
  const { data: patientsData, isLoading } = getPatients();
  const { id, ordonance: ordonanceID } = useParams();
  const [drugs, setDrugs] = useState([]);
  const [drug, setDrug] = useState({});
  const [name, setName] = useState("");
  const [optionsArray, setOptionsArray] = useState(null); // Initialize with an empty array
  const [snackBar, setSnackBar] = useState({
    isOpen: false,
    message: "",
    severity: "info",
  });
  //TODO : fix when u add ordonance and try to get to it immediatly error
  const navigate = useNavigate();
  const isAddMode = !id;
  const onClose = () => setDrug({});

  let dataArray: Patient[] = [];
  let specifiedPatient;
  let newOptionsArray;
  if (
    patientsData &&
    typeof patientsData === "object" &&
    Object.keys(patientsData).length > 0
  ) {
    dataArray = Object.values(patientsData);
  }
  useEffect(() => {
    if (!isAddMode) {
      specifiedPatient = patientsData?.find(
        (patients) => patients.id === parseInt(id)
      );
      if (specifiedPatient) {
        setOptionsArray(specifiedPatient);
        setValue("patient", specifiedPatient);
        setValue("date", specifiedPatient.date);

        const SpecifiedOrdonance = specifiedPatient.ordonances.find(
          (ordonance) => ordonance.id === parseInt(ordonanceID)
        );

        const DrugsDetails = SpecifiedOrdonance.ordonance_details;

        const extractedDetails = DrugsDetails.map((item) => {
          return {
            medicine_name: item.medicine_name,
            note: item.note,
          };
        });
        setDrugs(extractedDetails);
      }
    }
  }, [patientsData, id]);
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
  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
    },
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const onSubmit = (data) => {
    data.drugs = drugs;
    console.log(data);

    const formData = {
      patient_id: data?.patient.id,
      medicine: data.drugs,
      date: data.date,
    };
    return isAddMode ? createUser(formData) : editUser(formData, ordonanceID);
  };

  const createUser = (formData) => {
    Addmutation.mutateAsync(formData, {
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
  };
  const editUser = (formData, ordonanceID) => {
    return mutation.mutateAsync(
      { data: formData, id: ordonanceID },
      {
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
      }
    );
  };
  const handleOpenModal = (index: number) => {
    const current = drugs[index];
    setDrug({
      id: current.id,
      name: current.name,
      note: current.note || "",
    });
  };
  const handleNoteChange = (id, value) => {
    setDrugs((prevDrugs) =>
      prevDrugs.map((drug) =>
        drug.id === id ? { ...drug, note: value } : drug
      )
    );
  };
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
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2"
      >
        <Box className="flex justify-center  text-lg  text-gray-400 uppercase">
          <span>Ajouter une ordonance </span>
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
                  id="combo-box-demo"
                  value={optionsArray || field.value || null}
                  options={dataArray}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionLabel={(option) => `${option.nom} ${option.prenom}`}
                  renderInput={(params) => (
                    <TextField {...params} label="Patient" />
                  )}
                  onChange={(e, data) => {
                    optionsArray && setOptionsArray(data);
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
          <FormControl className="w-full md:flex-1">
            <Controller
              name="date"
              control={control}
              rules={{
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const currentDate = new Date();
                  return (
                    selectedDate <= currentDate ||
                    "La date ne peut pas être dans le futur."
                  );
                },
              }}
              render={({ field }) => (
                <TextField
                  type="date"
                  {...field}
                  id="outlined-required"
                  size="large"
                />
              )}
            />
          </FormControl>
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
              const valid =
                name.trim() !== "" &&
                !drugs.some(
                  (e) => e.medicine_name.toUpperCase() === name.toUpperCase()
                );
              if (valid) {
                setDrugs([
                  ...drugs,
                  { medicine_name: name, note: "", id: drugs.length },
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

          <TableContainer className="w-full md:flex-1 flex-wrap">
            <Table sx={{ minWidth: 480 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Medicine name</TableCell>
                  <TableCell>Note</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {drugs.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.medicine_name}
                    </TableCell>
                    <TableCell style={{ minWidth: 200 }}>
                      <TextField
                        fullWidth
                        value={row.note || ""}
                        onChange={(e) =>
                          handleNoteChange(row.id, e.target.value)
                        }
                        label="Note"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ marginTop: 5 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 16 }}
            fullWidth={true}
          >
            {!isAddMode ? "Misajour" : "Enregistrer"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default AddOrdonanceUpdated;
