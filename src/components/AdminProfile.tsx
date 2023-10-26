import {
  Avatar,
  Box,
  Button,
  FormControl,
  Input,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";
import { useState } from "react";
import MuiAlert from "@mui/material/Alert";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axiosInstance from "../services/Http";
interface Props {
  name: string;
  email: string;
  picture: File | null;
}

const AdminProfile = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning" | "info" | undefined
  >(undefined);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const storedUserData = localStorage.getItem("user_login");
  const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
  const userProfilePicture = parsedUserData
    ? parsedUserData.profile || null
    : null;
  const userData = parsedUserData.user;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Props>({
    defaultValues: {
      name: userData?.name || "",
      email: userData?.email || "",
    },
  });
  const customErrorMessages = {
    name: {
      required: "Le champ Nom est requis.",
    },
    email: {
      required: "Le champ Email est requis.",
    },
  };
  const onSubmit: SubmitHandler<Props> = async (data) => {
    try {
      var form = new FormData();
      form.append("name", data.name);
      form.append("email", data.email);
      if (data.picture) {
        form.append("picture", data.picture);
      }

      const response = await axiosInstance.post(
        "http://127.0.0.1:8000/api/v1/Admin/update/profile",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        }
      );
      if (response.status === 200) {
        const user = JSON.parse(localStorage.getItem("user_login") || "{}");
        user.user = response.data.data;
        user.profile = response.data.profile;
        localStorage.setItem("user_login", JSON.stringify(user));
        setSnackbarOpen(true);
        setSnackbarMessage("Admin modified successfully");
        setSnackbarSeverity("success");
      }
    } catch (error) {
      setSnackbarOpen(false);
      setSnackbarMessage("Oops something went wrong please try again");
      setSnackbarSeverity("error");
    }
  };
  return (
    <Paper className="p-4" elevation={12}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className="w-full flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box className="w-full flex flex-col gap-2 items-center justify-center	">
          <Avatar
            alt="Remy Sharp"
            src={
              imageFile ? URL.createObjectURL(imageFile) : userProfilePicture
            }
            sx={{ width: 120, height: 120 }}
          />
          <Button variant="contained" component="label">
            Importer l'image
            <Controller
              control={control}
              name={"picture"}
              render={({ field: { value, onChange, ...field } }) => {
                return (
                  <Input
                    {...field}
                    value={value?.fileName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(event.target.files?.[0]);

                      setImageFile(event.target.files[0]);
                    }}
                    type="file"
                    inputProps={{
                      accept: "image/*",
                    }}
                    id="picture"
                    style={{ display: "none" }}
                  />
                );
              }}
            />
          </Button>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <label htmlFor="name" className="w-full md:w-[160px]">
            Nom:
          </label>
          <FormControl className="w-full md:flex-1">
            <Controller
              name="name"
              control={control}
              rules={{ required: customErrorMessages.name.required }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="name"
                  label="name"
                  size="small"
                  error={!!errors.name} // Add error prop based on whether the field has an error
                  helperText={errors.name?.message} // Display the error message for the field
                />
              )}
            />
          </FormControl>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <label htmlFor="name" className="w-full md:w-[160px]">
            Email:
          </label>
          <FormControl className="w-full md:flex-1">
            <Controller
              name="email"
              control={control}
              rules={{ required: customErrorMessages.email.required }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="email"
                  label="email"
                  size="small"
                  error={!!errors.email} // Add error prop based on whether the field has an error
                  helperText={errors.email?.message} // Display the error message for the field
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
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
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
    </Paper>
  );
};

export default AdminProfile;
