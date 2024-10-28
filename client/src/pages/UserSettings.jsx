import * as React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useAuth } from "../context/AuthProvider";

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

export default function UserSettings() {
  const [expanded, setExpanded] = React.useState(false);

  const auth = useAuth();

  if (!auth.getUser()) {
    return "";
  }

  const userData = auth.getUser();
  console.log(userData);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const keys = Object.keys(userData);
  const usuarioKeys = keys.slice(2, 5); // Desde el tercer al quinto dato
  const otrosDatosKeys = keys.slice(8, keys.length - 1); // Desde el sexto hasta el antepenúltimo dato

  return (
    <React.Fragment>
      <Grid container sx={{ mx: "auto" }}>
        <Grid
          item
          sx={{
            display: "flex",
            width: "30%",
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
          {Object.entries(opcionesPorCategoria).map(([categoria, opciones]) => (
            <Accordion
              key={categoria}
              expanded={expanded === categoria}
              onChange={handleChange(categoria)}
              sx={{ width: "100%" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${categoria}-content`}
                id={`${categoria}-header`}
              >
                <Typography>
                  {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {opciones.map((opcion, index) => (
                    <ListItem key={index} sx={{ ml: 3 }}>
                      <ListItemText
                        primary={opcion.label}
                        secondary={opcion.description}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
        <Grid
          container
          sm={12}
          md={7}
          lg={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: "background.paper",
            alignItems: "start",
            py: 2,
            px: 4,
          }}
        >
          <Box p={6} boxShadow={3} borderRadius={4}>
            <Typography
              variant="h2"
              gutterBottom
              align="center"
              sx={{
                fontFamily: "Arial Black",
                color: "#333",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              Perfil de Usuario
            </Typography>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              mb={4}
            >
              <Avatar sx={{ bgcolor: "#546E7A", color: "#FFF" }}>
                {userData.type === "estudiante" ? (
                  <SchoolIcon />
                ) : (
                  <PersonIcon />
                )}
              </Avatar>
              <Typography
                variant="h3"
                sx={{
                  pl: 2,
                  my: 2,
                  fontFamily: "Arial",
                  color: "#333",
                }}
              >
                {userData.type.toUpperCase()}
              </Typography>
            </Box>
            <Divider />
            <Box py={4}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ mb: 3, fontFamily: "Arial", color: "#333" }}
              >
                DATOS DEL USUARIO
              </Typography>
              <Grid container spacing={2} sx={{ pl: 4 }}>
                {usuarioKeys.map((key) => (
                  <React.Fragment key={key}>
                    <Grid
                      item
                      xs={6}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      {renderIcon(key)}
                      <Typography sx={{ ml: 1 }}>
                        <strong>
                          {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ color: "#546E7A" }}>
                        {userData[key]}
                      </Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Box>
            <Divider />
            <Box py={4}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ mb: 3, fontFamily: "Arial", color: "#333" }}
              >
                DATOS DEL {userData.type.toUpperCase()}
              </Typography>
              <Grid container spacing={2} sx={{ pl: 4 }}>
                {otrosDatosKeys.map((key) => (
                  <React.Fragment key={key}>
                    <Grid
                      item
                      xs={6}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      {renderIcon(key)}
                      <Typography sx={{ ml: 1 }}>
                        <strong>
                          {(key.charAt(0).toUpperCase() + key.slice(1))
                            // Reemplaza "_x" por " X" (el carácter después del guion bajo en mayúscula)
                            .replace(
                              /_(.)/g,
                              (match, p1) => " " + p1.toUpperCase()
                            )
                            // Convierte el primer carácter de la cadena resultante a mayúscula
                            .replace(/^./, (match) => match.toUpperCase())}
                        </strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ color: "#546E7A" }}>
                        {userData[key]}
                      </Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const opcionesPorCategoria = {
  perfil: [
    {
      label: "Editar Perfil",
      description: "Aquí puedes editar la información de tu perfil.",
    },
    {
      label: "Cambiar Foto de Perfil",
      description: "Cambia tu foto de perfil aquí.",
    },
    // Añadir más opciones de perfil aquí si es necesario
  ],
  configuracion: [
    { label: "Cambiar Contraseña", description: "Cambia tu contraseña aquí." },
    {
      label: "Configuración de Privacidad",
      description: "Ajusta la configuración de privacidad de tu cuenta.",
    },
    // Añadir más opciones de configuración aquí si es necesario
  ],
  notificaciones: [
    {
      label: "Preferencias de Notificación",
      description: "Configura cómo recibir notificaciones.",
    },
    {
      label: "Activar/Desactivar Notificaciones por Correo Electrónico",
      description:
        "Activa o desactiva las notificaciones por correo electrónico.",
    },
    // Añadir más opciones de notificaciones aquí si es necesario
  ],
  cuenta: [
    {
      label: "Cerrar Sesión",
      description: "Haz clic aquí para cerrar sesión de tu cuenta.",
    },
    // Añadir más opciones de la cuenta aquí si es necesario
  ],
};

// // Datos de ejemplo del usuario
// const userData = {
//   type: "estudiante",
//   id: 3,
//   firstName: "Aldair",
//   lastName: "Huaman Caceres",
//   email: "aldair@gmail.com",
//   role: "student",
//   codigo: "021100115k",
//   matricula: "Regular",
//   carrera: "Ing. Sistemas",
//   semestre: 7,
//   fecha_nacimiento: "2010-04-13T05:00:00.000Z",
//   telefono: "972256712",
//   direccion: "Su Casa ps",
//   user_id: 27,
// };

function renderIcon(key) {
  switch (key) {
    case "email":
      return <EmailIcon sx={{ color: "#7D4A35" }} />;
    case "telefono":
      return <PhoneIcon sx={{ color: "#405D46" }} />;
    case "direccion":
      return <LocationOnIcon sx={{ color: "#7E3636" }} />;
    case "fecha_nacimiento":
      return <DateRangeIcon sx={{ color: "#2D3F4F" }} />;
    default:
      return <AccountCircleIcon sx={{ color: "#9E9E9E" }} />;
  }
}
