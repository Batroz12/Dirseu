// import React from "react";
// import Grid from "@mui/material/Unstable_Grid2";

// import { Box, Card, Typography } from "@mui/material";

// import ButtonImgBase from "../components/components/ButtonImgBase";
// import { Outlet } from "react-router-dom";

// export default function Administrator() {
//   return (
//     <React.Fragment>
//       <Box
//         sx={{
//           display: "flex",
//           textAlign: "center",
//           justifyContent: "center",
//           my: 2,
//         }}
//       >
//         <Typography component="h1" variant="title1" sx={{ fontWeight: "bold" }}>
//           ADMINISTRAR MODULOS
//         </Typography>
//       </Box>
//       {/* cards */}

//       <Grid
//         container
//         spacing={2}
//         columns={9}
//         sx={{ textAlign: "center", display: "block" }}
//       >
//         {data.map((card, index) => (
//           <Grid xs={6} sm={3} md={2} lg={2.25}>
//             <Card variant="outlined" sx={{ height: "100%", flexGrow: 1 }}>
//               <ButtonImgBase
//                 title={card.title}
//                 url={card.image}
//                 width="100%"
//                 to={card.to}
//               />
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//       <Outlet />
//     </React.Fragment>
//   );
// }

// const data = [
//   {
//     title: "Taller",
//     image: "https://tallerdigital.cl/wp-content/uploads/2020/06/movil01.png",
//     to: "list/Talleres/talleres",
//   },
//   {
//     title: "Capacitacion",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuKuE9ZF_Roc-2BeI1cpIyOuglFDtq8la_jQ&s",
//     to: "list/Capacitaciones/capacitaciones",
//   },
//   {
//     title: "Oferta Laboral",
//     image:
//       "https://www.unp.edu.pe/wp-content/uploads/2023/08/bolsa_trabajo.png",
//     to: "list/Ofertas Laborales/ofertas_laborales",
//   },
//   {
//     title: "Voluntariado",
//     image:
//       "https://blog.oxfamintermon.org/wp-content/uploads/2015/01/voluntariado-europeo-oxfam-intermon-2-726x477.jpg",
//     to: "list/Voluntariados/voluntariados",
//   },
// ];

import * as React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import AddressForm from "../components/administrator/AddressForm";
import getCheckoutTheme from "../components/administrator/getCheckoutTheme";
import Info from "../components/administrator/Info";
import InfoMobile from "../components/administrator/InfoMobile";
import PaymentForm from "../components/administrator/PaymentForm";
import Review from "../components/administrator/Review";
import ToggleColorMode from "../components/administrator/ToggleColorMode";
import SitemarkIcon from "../components/administrator/SitemarkIcon";
import ButtonImgBase from "../components/components/ButtonImgBase";

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100dvw",
        position: "fixed",
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Toggle design language"
        sx={{
          backgroundColor: "background.default",
          "& .Mui-selected": {
            pointerEvents: "none",
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: "20px", mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Administrator() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const checkoutTheme = createTheme(getCheckoutTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [activeStep, setActiveStep] = React.useState(0);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <Grid container sx={{}}>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "background.paper",
            borderRight: "1px solid",
            borderColor: "divider",
            alignItems: "start",
            pt: 4,
            px: 5,
            gap: 2,
          }}
        >
          {data.map((card, index) => (
            <Grid>
              <Card variant="outlined" sx={{ flexGrow: 1 }}>
                <ButtonImgBase
                  title={card.title}
                  url={card.image}
                  width="100%"
                  height="130px"
                  to={card.to}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          sm={12}
          md={7}
          lg={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            alignItems: "start",
            pt: { xs: 2, sm: 4 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: { sm: "space-between", md: "flex-end" },
              alignItems: "center",
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexGrow: 1,
              }}
            >
              <Stepper
                id="desktop-stepper"
                activeStep={activeStep}
                sx={{
                  width: "100%",
                  height: 40,
                }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{
                      ":first-child": { pl: 0 },
                      ":last-child": { pr: 0 },
                    }}
                    key={label}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
          <Card
            sx={{
              display: { xs: "flex", md: "none" },
              width: "100%",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                ":last-child": { pb: 2 },
              }}
            >
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Selected products
                </Typography>
                <Typography variant="body1">
                  {activeStep >= 2 ? "$144.97" : "$134.98"}
                </Typography>
              </div>
              <InfoMobile
                totalPrice={activeStep >= 2 ? "$144.97" : "$134.98"}
              />
            </CardContent>
          </Card>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
              maxHeight: "720px",
              gap: { xs: 5, md: "none" },
            }}
          >
            <Stepper
              id="mobile-stepper"
              activeStep={activeStep}
              alternativeLabel
              sx={{ display: { sm: "flex", md: "none" } }}
            >
              {steps.map((label) => (
                <Step
                  sx={{
                    ":first-child": { pl: 0 },
                    ":last-child": { pr: 0 },
                    "& .MuiStepConnector-root": { top: { xs: 6, sm: 12 } },
                  }}
                  key={label}
                >
                  <StepLabel
                    sx={{
                      ".MuiStepLabel-labelContainer": { maxWidth: "70px" },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Stack spacing={2} useFlexGap>
                <Typography variant="h1">📦</Typography>
                <Typography variant="h5">Thank you for your order!</Typography>
                <Typography variant="body1" color="text.secondary">
                  Your order number is
                  <strong>&nbsp;#140396</strong>. We have emailed your order
                  confirmation and will update you once its shipped.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    alignSelf: "start",
                    width: { xs: "100%", sm: "auto" },
                  }}
                >
                  Go to my orders
                </Button>
              </Stack>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column-reverse", sm: "row" },
                    justifyContent:
                      activeStep !== 0 ? "space-between" : "flex-end",
                    alignItems: "end",
                    flexGrow: 1,
                    gap: 1,
                    pb: { xs: 12, sm: 0 },
                    mt: { xs: 2, sm: 0 },
                    mb: "60px",
                  }}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="text"
                      sx={{
                        display: { xs: "none", sm: "flex" },
                      }}
                    >
                      Previous
                    </Button>
                  )}

                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
                      sx={{
                        display: { xs: "flex", sm: "none" },
                      }}
                    >
                      Previous
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    onClick={handleNext}
                    sx={{
                      width: { xs: "100%", sm: "fit-content" },
                    }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const data = [
  {
    title: "Taller",
    image: "https://tallerdigital.cl/wp-content/uploads/2020/06/movil01.png",
    to: "list/Talleres/talleres",
  },
  {
    title: "Capacitacion",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuKuE9ZF_Roc-2BeI1cpIyOuglFDtq8la_jQ&s",
    to: "list/Capacitaciones/capacitaciones",
  },
  {
    title: "Oferta Laboral",
    image:
      "https://www.unp.edu.pe/wp-content/uploads/2023/08/bolsa_trabajo.png",
    to: "list/Ofertas Laborales/ofertas_laborales",
  },
  {
    title: "Voluntariado",
    image:
      "https://blog.oxfamintermon.org/wp-content/uploads/2015/01/voluntariado-europeo-oxfam-intermon-2-726x477.jpg",
    to: "list/Voluntariados/voluntariados",
  },
];
