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
import { useSnackbarStore } from "../zustand/useSnackbarStore";
import { useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_Ordonance } from "../constants";
import getOrdonance from "../hooks/getOrdonance";
const AddOrdonanceUpdated = () => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbarStore();
  const Addmutation = addOrdonance();
  const mutation = updateOrdonance();
  const { data: patientsData, isLoading } = getPatients();
  const { id, ordonance: ordonanceID } = useParams();
  const [drugs, setDrugs] = useState([]);
  const [drug, setDrug] = useState({});
  const [name, setName] = useState("");
  const [optionsArray, setOptionsArray] = useState(null);
  const [iserror, setIsError] = useState(false);

  const navigate = useNavigate();
  const isAddMode = !id;

  let dataArray: Patient[] = [];
  let specifiedPatient;

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
        // error here
        if (SpecifiedOrdonance) {
          const DrugsDetails = SpecifiedOrdonance.ordonance_details;

          const extractedDetails = DrugsDetails.map((item) => {
            return {
              id: item.id,
              medicine_name: item.medicine_name,
              note: item.note,
            };
          });
          setDrugs(extractedDetails);
        }
      }
    }
  }, [patientsData, id]);

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

  const onSubmit = async (data) => {
    data.drugs = drugs;

    if (data.drugs && data.drugs.length === 0) {
      setIsError(true);
    } else {
      const formData = {
        patient_id: data?.patient.id,
        medicine: data.drugs,
        date: data.date,
      };

      try {
        if (isAddMode) {
          await createUser(formData);
        } else {
          await editUser(formData, ordonanceID);
        }
        queryClient.invalidateQueries({ queryKey: ["ordonance"] });
        navigate("/Ordonnance");
      } catch (error) {
        const message =
          error instanceof AxiosError
            ? error.response?.data?.message
            : error.message;
        showSnackbar(message, "error");
      }
    }
  };

  const createUser = async (formData) => {
    await Addmutation.mutateAsync(formData, {
      onSuccess: () => {
        showSnackbar("Ordonance ajouté avec succès.", "success");
      },
      onError: (error: any) => {
        const message =
          error instanceof AxiosError
            ? error.response?.data?.message
            : error.message;
        showSnackbar(message, "warning");
      },
    });
  };
  const editUser = (formData, ordonanceID) => {
    return mutation.mutateAsync(
      { data: formData, id: ordonanceID },
      {
        onSuccess: () => {
          showSnackbar("Ordonance ajouté avec succès.", "success");
        },
        onError: (error: any) => {
          const message =
            error instanceof AxiosError
              ? error.response?.data?.message
              : error.message;
          showSnackbar(message, "warning");
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
        <Box className="w-full flex flex-col gap-4">
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center mt-2">
            <label htmlFor="nom" className="w-full md:w-[160px]">
              Patient:
            </label>
            <Box className={`w-full md:flex-1 `}>
              <Controller
                rules={{ required: "Veuillez sélectionner un patient" }} // Add required rule
                control={control}
                name="patient"
                render={({ field, fieldState }) => (
                  <Autocomplete
                    {...field}
                    id="combo-box-demo"
                    value={optionsArray || field.value || null}
                    options={dataArray}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) =>
                      `${option.nom} ${option.prenom}`
                    }
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          label="Patient"
                          error={Boolean(fieldState?.error?.message)}
                          helperText={fieldState?.error?.message || ""}
                        />
                      );
                    }}
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
          <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-end md:items-center mt-2">
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
          {iserror && (
            <Typography color="error" className="flex justify-center">
              S'il vous plaît, sélectionnez au moins un médicament.
            </Typography>
          )}
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
          <Box className="flex mt-4">
            <Button
              type="submit"
              variant="contained"
              className="w-full md:w-max !px-10 !py-3 rounded-lg !ms-auto"
            >
              Enregistrer
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default AddOrdonanceUpdated;
