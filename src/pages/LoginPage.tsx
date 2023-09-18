import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router";
import isUserLoggedIn from "../utils/loginChecker";
import { FormHelperText } from "@mui/material";

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

interface ApiResponse {
  status: number;
  message: string;
  data: any;
}

export default function SignIn() {
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [userdata, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });
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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors = {
      email: !userdata.email.trim(),
      password: !userdata.password.trim(),
    };
    setErrors(newErrors);
    axios
      .post("http://127.0.0.1:8000/api/v1/login", userdata)
      .then((res: AxiosResponse<ApiResponse>) => {
        if (res.status === 200) {
          localStorage.setItem("user_login", JSON.stringify(res.data.data));
          setLoggedIn(true);
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
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
        {loggedIn ? (
          <Avatar
            sx={{
              m: 1,
              bgcolor: "success.main",
              animation: "bounce 2s ease-in-out",
            }}
          >
            <LockOpenOutlinedIcon />
          </Avatar>
        ) : (
          <Avatar
            sx={{
              m: 1,
              bgcolor: "secondary.main",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
        )}
        <Typography component="h1" variant="h5" className="text-xl ">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={errors.email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
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
          {error && (
            <Alert variant="filled" severity="error">
              Les identifiants ne correspondent pas. Réessayez.
            </Alert>
          )}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
