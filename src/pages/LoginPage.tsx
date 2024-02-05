import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router";
import isUserLoggedIn from "../utils/loginChecker";
import { FormHelperText } from "@mui/material";
import addGlobal from "../hooks/addGlobal";
import { AuthData, AuthServiceClient } from "../services/AuthService";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/pkerguy96">
        ELKOR
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

interface UserData {
  email: string;
  password: string;
}

export default function SignIn() {
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const [error, setError] = useState({ isError: false, message: "" });
  const [userdata, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });
  const addmutation = addGlobal({} as AuthData, AuthServiceClient);
  const navigate = useNavigate();
  useEffect(() => {
    isUserLoggedIn(navigate);
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors = {
      email: !userdata.email.trim(),
      password: !userdata.password.trim(),
    };
    setErrors(newErrors);
    await addmutation.mutateAsync(userdata, {
      onSuccess: (data: any) => {
        localStorage.setItem("user_login", JSON.stringify(data.data));
        navigate("/dashboard");
      },
      onError: (error: any) => {
        const message =
          error instanceof AxiosError
            ? error.response?.data?.message
            : error.message;
        setError({ isError: true, message });
      },
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src="/logo.png" />

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={errors.email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Address Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            value={userdata.email}
          />

          {errors.email && (
            <FormHelperText id="email-error-text" style={{ color: "red" }}>
              Le champ adresse email est obligatoire.
            </FormHelperText>
          )}
          <TextField
            error={errors.password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={userdata.password}
          />
          {errors.password && (
            <FormHelperText id="password-text" style={{ color: "red" }}>
              Le champ mot de pass est obligatoire.
            </FormHelperText>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {error.isError && (
            <Alert variant="filled" severity="error">
              {error.message}
            </Alert>
          )}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Mot de passe oublié ?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
