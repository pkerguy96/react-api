//@ts-nocheck
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import "../styles.css";
import { Patient } from "./AddPatientForm";
import LoadingSpinner from "../components/LoadingSpinner";
import { Controller, useForm } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AxiosError } from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Older, Younger, listOperationsArray } from "../constants";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import getGlobal from "../hooks/getGlobal";
import { CACHE_KEY_PATIENTS } from "../constants";
import patientAPIClient, { OnlyPatientData } from "../services/PatientService";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import addGlobal from "../hooks/addGlobal";
import operationApiClient, { Operation } from "../services/OperationService";
import { useSnackbarStore } from "../zustand/useSnackbarStore";

const getColor = (colors) => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  if (colors.includes(randomColor)) return getColor(colors);
  return "#" + randomColor;
};

const PatientOperation = () => {
  const addMutation = addGlobal({} as Operation, operationApiClient);
  const { data, isLoading } = getGlobal(
    {} as OnlyPatientData, // Tname (you can use a placeholder object here)
    [CACHE_KEY_PATIENTS[0]], // query
    patientAPIClient, // service
    undefined // opts
  );

  const { id, age } = useParams<{ id: string; age: string }>();
  const { showSnackbar } = useSnackbarStore();
  const navigate = useNavigate();
  const [specificPatient, setSpecificPatient] = useState<Patient | undefined>(
    undefined
  );
  const [globalCurrentColor, setGlobalCurrentColor] = useState(getColor([]));
  const [globalTeeth, setGlobalTeeth] = useState([]);
  const [globalData, setGlobalData] = useState([]);
  const [globalerror, setGlobalError] = useState("");
  const [clientage, setClientAge] = useState("");

  const { handleSubmit, getValues, setValue, control, watch } = useForm({});
  const isFullyPaid = watch("fullyPaid");

  const getItemName = useMemo(() => {
    return (value) => {
      const item = listOperationsArray.find((item) => item.value === value);

      return item ? item.label : "Unknown Item";
    };
  }, [listOperationsArray]);

  const teethColor = useMemo(() => {
    return (key) => {
      var color = "transparent";
      const found = globalData.find((e) => e.teeth.includes(key));
      if (found) color = found.color;
      if (globalTeeth.includes(key)) color = globalCurrentColor;
      return color;
    };
  }, [globalData, globalTeeth, globalCurrentColor]);

  const validatePrix = useMemo(() => {
    return (value: number) => {
      const totalPrice = globalData.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price;
      }, 0);
      if (totalPrice <= 0) {
        return setGlobalError("le prix doit etre un nombre positive.");
      }
      if (totalPrice < value) {
        return "le montant payé ne doit pas dépasser le prix";
      }

      return true;
    };
  }, [globalData]);

  useEffect(() => {
    if (data && id && age) {
      const foundPatient = (data as Patient[]).find(
        (patient: Patient) => patient.id === parseInt(id)
      );
      if (foundPatient) {
        setSpecificPatient(foundPatient);
        const currentYear = new Date().getFullYear();

        const patientAge = currentYear - parseInt(age);

        if (patientAge < 13) {
          setClientAge("younger");
        } else {
          setClientAge("older");
        }
      }
    }
  }, [data, id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  const onSubmit = (data: any) => {
    const newData = globalData.map((oldObject) => {
      return {
        operation_type: oldObject.operation,
        price: oldObject.price,
        tooth_id: oldObject.teeth,
      };
    });

    const validData = {
      operations: newData,
      is_paid: isFullyPaid,
      note: data?.note,
      patient_id: specificPatient?.id,
      amount_paid: parseFloat(data?.paidAmount),
    };

    if (!validData.operations || validData.operations.length === 0) {
      setGlobalError("Veuillez ajouter au moins une opération.");
    } else {
      addMutation.mutateAsync(validData, {
        onSuccess: () => {
          showSnackbar("Ordonnance créée avec succès", "success");
          navigate(`/AddOrdonance/${id}`);
        },
        onError: (error: any) => {
          const message =
            error instanceof AxiosError
              ? error.response?.data?.message
              : error.message;

          showSnackbar(`Oops ${message}`, "error");
        },
      });
    }
  };

  const toggleStrokeColor = (key: number) => {
    const teeth = [...globalTeeth];
    var current = teeth.indexOf(key);
    if (current > -1) teeth.splice(current, 1);
    else teeth.push(key);
    setGlobalTeeth(teeth);
  };

  const resetTeethSelection = () => {
    setGlobalCurrentColor(getColor([]));
    setGlobalTeeth([]);
    setGlobalData([]);
  };

  const clearTeeth = (item) => {
    const data = globalData.filter((d, i) => d.id !== item.id);
    setGlobalData(data);
  };

  return (
    <Paper>
      <FormControl
        component="form"
        className="!p-6 w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/**top bar */}
        <Box className="flex flex-col justify-center gap-4">
          <Box className="flex flex-col md:flex-row md:items-center md:justify-between ">
            <Typography
              className="px-2 flex justify-center text-xl font-bold  text-gray-400"
              variant="h6"
            >
              Veuillez sélectionner les dents que vous souhaitez opérer
            </Typography>
            <Link to={`/Patients/Details/${id}`}>
              <p className="text-md font-mono font-bold text-[#1976d2] cursor-pointer ">
                Historique des opérations
              </p>
            </Link>
          </Box>

          <ButtonGroup
            className="flex  justify-center "
            disableElevation
            variant="outlined"
            aria-label="Disabled elevation buttons"
          >
            <Button
              className={`${clientage === "older" ? "!bg-blue-100 " : ""}`}
              onClick={() => {
                setClientAge("older");
                resetTeethSelection();
              }}
            >
              Mature
            </Button>
            <Button
              className={`${clientage === "younger" ? "!bg-blue-100 " : ""}`}
              onClick={() => {
                setClientAge("younger");
                resetTeethSelection();
              }}
            >
              Jeune
            </Button>
          </ButtonGroup>
        </Box>
        {/**Middle */}
        <Box className="w-full grid grid-cols-1 grid-rows-1 gap-4 lg:grid-cols-12 lg:my-4">
          <Box className="mx-auto my-auto relative lg:col-span-5">
            <img
              src={clientage === "older" ? "/adult.png" : "/testmouth.png"}
              alt="patient"
              className="block select-none mx-auto"
              style={{
                height: "auto", // Set height to auto to maintain aspect ratio
                width: "100%", // Set the desired width
              }}
            />
            <svg
              className="absolute left-1/2 -translate-x-1/2 inset-0 select-none"
              width="100%"
              height="100%"
              viewBox={clientage === "older" ? "0 0 597 784" : "0 0 400 518"}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {(clientage === "older" ? Older : Younger).map((p, i) => (
                <polygon
                  key={i}
                  className="cursor-pointer"
                  fill={teethColor(p[1])}
                  strokeWidth={3}
                  stroke={teethColor(p[1])}
                  points={String(p[0])}
                  {...(!globalData.find((e) => e.teeth.includes(p[1]))
                    ? {
                        onClick: () => toggleStrokeColor(p[1]),
                      }
                    : {})}
                />
              ))}
            </svg>
          </Box>
          <Box className="w-full flex flex-col gap-4 lg:col-span-7">
            <Typography
              className="text-2xl font-bold text-center text-[#1976d2] "
              variant="h5"
            >
              Formulaire d'opération.
            </Typography>
            <FormControl>
              <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-end md:items-center">
                <Box className="w-full md:flex-1 md:w-0">
                  <InputLabel id="select-type-label-o">Type</InputLabel>
                  <Controller
                    name="operation"
                    defaultValue=""
                    control={control}
                    render={({ field, fieldState }) => (
                      <Box className="flex flex-col">
                        <Select
                          {...field}
                          labelId="select-type-label-o"
                          id="select-type-helper"
                          label="Type"
                        >
                          {listOperationsArray.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText error={!!fieldState.error}>
                          {fieldState.error?.message}
                        </FormHelperText>
                      </Box>
                    )}
                  />
                </Box>
                <Button
                  className="w-max"
                  sx={{ borderRadius: 16 }}
                  variant="outlined"
                  endIcon={<AddIcon />}
                  onClick={(e) => {
                    const selectedOperation = getValues("operation");
                    const valid = !globalData.find(
                      (e) => e.operation === selectedOperation
                    );

                    if (valid && selectedOperation && globalTeeth.length) {
                      setGlobalData([
                        ...globalData,
                        {
                          id: globalData.length + 1,
                          color: globalCurrentColor,
                          teeth: globalTeeth,
                          operation: selectedOperation,
                        },
                      ]);
                      setGlobalTeeth([]);
                      setGlobalCurrentColor(
                        getColor(globalData.map((e) => e.color))
                      );
                      setValue("operation", ""); // Update the value in React Hook Form state
                    }
                  }}
                >
                  Ajouter
                </Button>
              </Box>
            </FormControl>
            <TableContainer className="w-full max-h-[400px] flex-wrap overflow-auto border border-gray-300">
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow className="bg-gray-300 !rounded-2xl	sticky top-0 z-10">
                    <TableCell>
                      <strong>Operation name</strong>
                    </TableCell>
                    <TableCell className="w-64">
                      <strong>Price</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {globalData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center flex-wrap gap-2">
                          <span
                            className="block w-2 h-2 rounded-full"
                            style={{ background: item.color }}
                          ></span>
                          <span className="block text-base font-semibold">
                            {getItemName(item.operation)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="w-64">
                        <Box className="w-full flex flex-wrap items-center gap-2">
                          <Controller
                            name={`operations[${index}]`}
                            control={control}
                            defaultValue={""}
                            rules={{ required: "Montant payé est requis" }}
                            render={({ field, fieldState }) => (
                              <TextField
                                {...field}
                                value={item.price || ""}
                                className="w-0 flex-1"
                                label="Montant payé"
                                variant="outlined"
                                helperText={
                                  fieldState.error ? (
                                    <span style={{ color: "red" }}>
                                      {fieldState.error.message}
                                    </span>
                                  ) : (
                                    ""
                                  )
                                }
                                type="number"
                                onChange={(e) => {
                                  setGlobalData(
                                    globalData.map((o) => {
                                      if (o.id === index + 1) {
                                        o.price = +e.target.value;
                                        field.onChange(e);
                                      }
                                      return o;
                                    })
                                  );
                                }}
                              />
                            )}
                          />
                          <Button
                            className="w-max"
                            variant="outlined"
                            color="error"
                            onClick={() => clearTeeth(item)}
                          >
                            <DeleteOutlineIcon />
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box className="w-full flex flex-wrap items-center -mt-4 font-black text-sm">
              <span className="block flex-1 p-4">Total Price:</span>
              <span className="block w-64 p-4 ps-8">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "MAD",
                }).format(
                  globalData.reduce((a, o) => {
                    if (o.price) return a + o.price;
                    return a;
                  }, 0)
                )}
              </span>
            </Box>
          </Box>
        </Box>
        {/**bottom bar */}
        <Box className="flex flex-col justify-center gap-4">
          <Box className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
            <Controller
              name="paidAmount"
              control={control}
              rules={{
                validate: validatePrix,
                ...(isFullyPaid
                  ? {
                      required: {
                        value: false,
                        message: "",
                      },
                    }
                  : {
                      required: {
                        value: true,
                        message: "le montant payé est requis",
                      },
                    }),
              }}
              defaultValue=""
              render={({ field, fieldState }) => (
                <Box className="flex-1">
                  <TextField
                    {...field}
                    disabled={isFullyPaid}
                    id="paidAmount"
                    label="Montant payé"
                    variant="outlined"
                    type="number"
                    fullWidth
                  />
                  <FormHelperText error={!!fieldState.error}>
                    {fieldState.error?.message}
                  </FormHelperText>
                </Box>
              )}
            />
            <Controller
              name="fullyPaid"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  className="w-max block"
                  control={<Checkbox {...field} />}
                  label={
                    <Typography variant="body2">Entièrement payé</Typography>
                  }
                />
              )}
            />
          </Box>
          <Controller
            name="note"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                id="large-text"
                label="Note"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
              />
            )}
          />
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
      </FormControl>

      {globalerror && (
        <Alert className="mt-2 flex justify-center" severity="error">
          {globalerror}
        </Alert>
      )}
    </Paper>
  );
};

export default PatientOperation;
