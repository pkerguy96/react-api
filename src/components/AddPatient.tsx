import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axiosInstance from "../Http";

interface Props {
  nom: string;
  prenom: string;
  cin: string;
  date: string;
  sex: string;
  address: string;
  phoneNumber?: string;
  mutuelle: string;
}
const AddPatient = () => {
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
    },
  }); // Specify Props as the generic type for useForm
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
  const onSubmit: SubmitHandler<Props> = async (data) => {
    try {
      console.log(data);
      // Send the form data to the API endpoint using Axios
      const response = await axiosInstance.post(
        "http://127.0.0.1:8000/api/v1/Patient",
        data
      );
      console.log("API response:", response.data);
    } catch (error) {
      // Handle any error that may occur during the API request
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box className="flex items-center">
        <span className="w-24 mr-1 sm:mr-10">Nom:</span>
        <FormControl fullWidth sx={{ m: 1 }}>
          <Controller
            name="nom"
            control={control}
            rules={{ required: customErrorMessages.nom.required }}
            render={({ field }) => (
              <TextField
                {...field}
                id="outlined-required"
                label="Nom"
                size="small"
                error={!!errors.nom} // Add error prop based on whether the field has an error
                helperText={errors.nom?.message} // Display the error message for the field
              />
            )}
          />
        </FormControl>
      </Box>
      <Box className="flex items-center">
        <span className="w-24 mr-1 sm:mr-10">Prenom:</span>
        <FormControl fullWidth sx={{ m: 1 }}>
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
      <Box className="flex items-center">
        <span className="w-24 mr-1 sm:mr-10">Cin:</span>
        <FormControl fullWidth sx={{ m: 1 }}>
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
      <Box className="flex items-center ">
        <span className="w-24 mr-1 sm:mr-10">Date de naissance:</span>
        <FormControl fullWidth sx={{ m: 1 }}>
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
      <Box className="flex items-center">
        <span className="w-24 mr-1 sm:mr-10">Sex:</span>
        <FormControl fullWidth sx={{ m: 1 }}>
          <Controller
            name="sex"
            control={control}
            rules={{ required: customErrorMessages.sex.required }}
            render={({ field }) => (
              <TextField
                {...field}
                id="outlined-required"
                label="Sex"
                size="small"
                error={!!errors.sex}
                helperText={errors.sex?.message}
              />
            )}
          />
        </FormControl>
      </Box>
      <Box className="flex items-center">
        <span className="w-24 mr-1 sm:mr-10">Adresse:</span>
        <FormControl fullWidth sx={{ m: 1 }}>
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
      <Box className="flex items-center">
        <span className="w-24 mr-1 sm:mr-10">Telephone:</span>
        <FormControl fullWidth sx={{ m: 1 }}>
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
      <Box className="flex items-center">
        <span className="w-24 mr-1 sm:mr-10">Mutuelle:</span>
        <FormControl fullWidth sx={{ m: 1 }} size="small">
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
  );
};

export default AddPatient;
