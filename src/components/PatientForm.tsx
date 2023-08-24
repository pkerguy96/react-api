import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { onSubmitHandler } from "../hooks/addPatient";
import { calculateAge } from "../utils/dateUtils";

export interface Props {
  nom: string;
  prenom: string;
  cin: string;
  date: string;
  sex: string;
  address: string;
  phoneNumber?: string;
  mutuelle: string;
  agecalc: string;
}
const AddPatient = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning" | "info" | undefined
  >(undefined);
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
    mutuelle: {
      required: "Le champ Mutuelle est requis.", // Customize the required error message for "nom" field
    },
    // Add more custom error messages for other fields as needed
  };
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<Props>({
    defaultValues: {
      nom: "",
      prenom: "",
      cin: "",
      date: "",
      sex: "",
      address: "",
      phoneNumber: "",
      mutuelle: "",
      agecalc: "",
    },
  }); // Specify Props as the generic type for useForm

  const onSubmit: SubmitHandler<Props> = async (data) => {
    try {
      await onSubmitHandler(
        data,
        {
          setSnackbarOpen,
          setSnackbarMessage,
          setSnackbarSeverity: (severity) => {
            // Set the severity to "success" specifically
            setSnackbarSeverity(severity);
          },
        },
        "success"
      );
      setTimeout(() => {
        navigate("/Patients");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

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
        open={snackbarOpen}
        autoHideDuration={3000} // Adjust the duration for how long the snackbar should be displayed
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{
          vertical: "top", // Set the vertical position to top
          horizontal: "right", // Set the horizontal position to right
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
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
                rules={{ required: customErrorMessages.date.required }}
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
          <label htmlFor="nom" className="w-full md:w-[160px]">
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
                  type="number"
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                />
              )}
            />
          </FormControl>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <label htmlFor="nom" className="w-full md:w-[160px]">
            Mutuelle:
          </label>
          <FormControl className="w-full md:flex-1" size="small">
            <InputLabel id="demo-select-small-label">Mutuelle</InputLabel>
            <Controller
              name="mutuelle"
              control={control}
              rules={{ required: customErrorMessages.mutuelle.required }} // Add any validation rules as needed
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  label="mutuelle"
                  error={!!errors.mutuelle}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Ten">Ten</MenuItem>
                  <MenuItem value="Twenty">Twenty</MenuItem>
                  <MenuItem value="Thirty">Thirty</MenuItem>
                </Select>
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

export default AddPatient;