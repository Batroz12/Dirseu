import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

import { accesUserRequest } from "../api/api";
import { useEffect } from "react";

const defaultTheme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const { isAuthenticated, saveUser } = useAuth();
  const goTo = useNavigate();

  useEffect(() => {
    if (isAuthenticated) goTo("/", { replace: true });
    // return <Navigate to="/Home" replace />;
  }, [isAuthenticated]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await accesUserRequest({
        email,
        password,
      });

      if (response.ok) {
        console.log("Acceso Exitoso");
        setErrorResponse("");
        const json = await response.json();

        if (json.accessToken && json.refreshToken) {
          console.log(json);
          saveUser(json);
        }
      } else {
        console.log("Algo Ocurrio");
        const json = await response.json();
        setErrorResponse(json.error);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh", p: 0, m: 0 }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            height: "100",
            backgroundImage:
              "url(https://mentor.pe/wp-content/uploads/2023/09/UAC-frontis.jpg)",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backdropFilter: "blur(3px)",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={10}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Centra el contenido verticalmente
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src="https://upload.wikimedia.org/wikipedia/commons/e/e4/CRSL_01.png"
              sx={{ m: 1, width: 120, height: 120 }}
            />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {!!errorResponse && (
              <Alert severity="error" sx={{ width: "90%", my: 2 }}>
                {errorResponse}
              </Alert>
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
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
                <Grid item>
                  <Link to={"/register"}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
