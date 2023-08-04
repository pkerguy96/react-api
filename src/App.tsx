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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router";

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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
interface UserData {
  email: string;
  password: string;
  // Add other properties if needed
}

interface ApiResponse {
  // Define the properties you expect in the response data
  status: number;
  message: string;
  data: any; // Change 'any' to the actual data type you expect in the 'data' field
}

function notLogedin(navigate: Function) {
  var user = localStorage.getItem("user_login");
  if (user) {
    var token = JSON.parse(user).token;
    if (!token) navigate("/");
    axios
      .get("http://127.0.0.1:8000/api/v1/verify-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        navigate("/dashboard");
      })
      .catch(() => {
        localStorage.removeItem("user_token");
        navigate("/");
      });
  } else navigate("/");
}

export default function SignIn() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    notLogedin(navigate);
  }, []);
  const [userdata, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/v1/login", userdata)
      .then((res: AxiosResponse<ApiResponse>) => {
        if (res.status === 200) {
          localStorage.setItem("user_login", JSON.stringify(res.data.data));
          setLoggedIn(true);

          // Wait for 5 seconds before redirecting

          navigate("/dashboard");

          // Clear the timeout when the component unmounts or when the redirect occurs
        }
      })
      .catch((err) => {
        setError(true);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              value={userdata.password}
            />
            {error && (
              <Alert variant="filled" severity="error">
                Les identifiants ne correspondent pas. Réessayez.
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
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
    </ThemeProvider>
  );
}
