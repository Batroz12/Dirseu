import * as React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const darkTheme = createTheme({ palette: { mode: "dark" } });
const lightTheme = createTheme({ palette: { mode: "light" } });

function Login() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          backgroundImage:
            "url('https://mentor.pe/wp-content/uploads/2023/09/UAC-frontis.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            textAlign: "center",
            backdropFilter: "blur(6px)",
          }}
        >
          <Paper
            elevation={24}
            sx={{
              width: "30%",
              height: "60%",
              m: "auto",
              backgroundColor: "#222",
            }}
          ></Paper>
        </Box>
      </Box>

      {/* <Grid container spacing={2}>
      {[lightTheme, darkTheme].map((theme, index) => (
        <Grid item xs={6} key={index}>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr' },
                gap: 2,
              }}
            >
              {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
                <Item key={elevation} elevation={elevation}>
                  {`elevation=${elevation}`}
                </Item>
              ))}
            </Box>
          </ThemeProvider>
        </Grid>
      ))}
    </Grid> */}
    </>
  );
}

export default Login;
