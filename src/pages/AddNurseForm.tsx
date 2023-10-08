import {
  Paper,
  Box,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAddNurseMutation } from "../hooks/addNurse";
import { AxiosError } from "axios";
import { calculateAge } from "../utils/dateUtils";
export interface Nurse {
  nom: string;
  prenom: string;
  cin: string;
  date: string;
  sex: string;
  address: string;
  phoneNumber?: string;

  agecalc: string;
}
const AddNurseForm = () => {
  const [snackBar, setSnackBar] = useState({
    isopen: false,
    message: "",
    severity: "",
  });

  const [age, setAge] = useState(0);
  const navigate = useNavigate();
  const customErrorMessages = {
    nom: {
      required: "Le champ Nom est requis.", // Customize the required error message for "nom" field
    },
    prenom: {
      required: "Le champ Prenom est requis.", // Customize the required error message for "nom" field
    },
    cin: {
      required: "Le champ Cin est requis.", // Customize the required error message for "nom" field
    },
    date: {
      required: "Le champ Date est requis.", // Customize the required error message for "nom" field
    },
    sex: {
      required: "Le champ Sex est requis.", // Customize the required error message for "nom" field
    },
    address: {
      required: "Le champ Address est requis.", // Customize the required error message for "nom" field
    },
    phoneNumber: {
      required: "Le champ Telephone est requis.", // Customize the required error message for "nom" field
    },
  };
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<Nurse>({
    defaultValues: {
      nom: "",
      prenom: "",
      cin: "",
      date: "",
      sex: "",
      address: "",
      phoneNumber: "",
      agecalc: "",
    },
  });
  const addPatientMutation = useAddNurseMutation(() => {
    reset({
      nom: "",
      prenom: "",
      cin: "",
      date: "",
      sex: "",
      address: "",
      phoneNumber: "",

      agecalc: "",
    });
  });
  const onSubmit: SubmitHandler<Nurse> = async (data) => {
    try {
      await addPatientMutation.mutateAsync(data);
      setSnackBar({
        isopen: true,
        message: "Patient added successfully",
        severity: "success",
      });
    } catch (error: any) {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message
          : error.message;
      setSnackBar({
        isopen: true,
        message: message,
        severity: "error",
      });
    }
  };
  useEffect(() => {
    let intervalId: number;
    if (snackBar.severity === "success") {
      intervalId = setInterval(() => {
        // Perform your navigation here
        navigate("/Nurses");
      }, 1500); // Adjust the interval duration (in milliseconds) as needed
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [snackBar.severity]);
  // Watch the 'date' field and calculate age whenever it changes
  register("date", {
    onChange: (e) => {
      const age = calculateAge(e.target.value);
      setAge(age); // Set the 'age' field in the form with the calculated age
    },
  });
  return (
    <Paper className="p-4">
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
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2"
      >
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <label htmlFor="nom" className="w-full md:w-[160px]">
            Nom:
          </label>
          <FormControl className="w-full md:flex-1">
            <Controller
              name="nom"
              control={control}
              rules={{ required: customErrorMessages.nom.required }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="nom"
                  label="Nom"
                  size="small"
                  error={!!errors.nom} // Add error prop based on whether the field has an error
                  helperText={errors.nom?.message} // Display the error message for the field
                />
              )}
            />
          </FormControl>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <label htmlFor="nom" className="w-full md:w-[160px]">
            Prenom:
          </label>
          <FormControl className="w-full md:flex-1">
            <Controller
              name="prenom"
              control={control}
              rules={{ required: customErrorMessages.prenom.required }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="outlined-required"
                  label="Prenom"
                  size="small"
                  error={!!errors.prenom}
                  helperText={errors.prenom?.message}
                />
              )}
            />
          </FormControl>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <label htmlFor="nom" className="w-full md:w-[160px]">
            Cin:
          </label>
          <FormControl className="w-full md:flex-1">
            <Controller
              name="cin"
              control={control}
              rules={{ required: customErrorMessages.cin.required }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="outlined-required"
                  label="Cin"
                  size="small"
                  error={!!errors.cin}
                  helperText={errors.cin?.message}
                />
              )}
            />
          </FormControl>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <Box className="w-full md:flex-1 flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
            <label htmlFor="nom" className="w-full md:w-[160px]">
              Date de naissance:
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="date"
                control={control}
                rules={{
                  required: customErrorMessages.date.required,
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
                    size="small"
                    error={!!errors.date}
                    helperText={errors.date?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="w-full md:w-[300px] flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
            <label htmlFor="nom" className="w-full md:w-[160px]">
              age calcule:
            </label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="agecalc"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-required"
                    disabled
                    size="small"
                    value={age}
                  />
                )}
              />
            </FormControl>
          </Box>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <label htmlFor="nom" className="w-full md:w-[160px]">
            Sex:
          </label>
          <FormControl className="w-full md:flex-1" size="small">
            <InputLabel id="demo-select-small-label">Sex</InputLabel>
            <Controller
              name="sex"
              control={control}
              rules={{ required: customErrorMessages.sex.required }} // Add any validation rules as needed
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  label="sex"
                  error={!!errors.sex}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <label htmlFor="nom" className="w-full md:w-[160px]">
            Adresse:
          </label>
          <FormControl className="w-full md:flex-1">
            <Controller
              name="address"
              control={control}
              rules={{ required: customErrorMessages.address.required }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="outlined-required"
                  label="Adresse"
                  size="small"
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              )}
            />
          </FormControl>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <label htmlFor="phoneNumber" className="w-full md:w-[160px]">
            Telephone:
          </label>
          <FormControl className="w-full md:flex-1">
            <Controller
              name="phoneNumber"
              control={control}
              rules={{ required: customErrorMessages.phoneNumber.required }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="outlined-required"
                  label="Phone Number"
                  size="small"
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                />
              )}
            />
          </FormControl>
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
    </Paper>
  );
};

export default AddNurseForm;