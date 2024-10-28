import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from "@mui/icons-material/Group";
import Backdrop from "@mui/material/Backdrop";

import { useNavigate, useParams } from "react-router-dom";
import { getTableByIdRequest, registerInscriptionRequest } from "../api/api";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import FormularioPDF from "../components/administrator/FormularioPDF";

export default function DetailsModules() {
  const [description, setDescription] = useState({});
  const [errorResponse, setErrorResponse] = useState("");

  const { table, id } = useParams();

  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    getDescription();
  }, [table, id]);

  async function getDescription() {
    try {
      const response = await getTableByIdRequest({ table, id });

      if (response.ok) {
        const json = await response.json();
        setDescription(json.data);
        console.log(json.data);
      } else {
        const json = await response.json();
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubscribe = async () => {
    try {
      if (auth.getUser().type !== "estudiante") {
        setErrorResponse("Un Docente no puede Inscribirse");
        console.log(errorResponse);
        handleOpen();
        return;
      }

      const response = await registerInscriptionRequest({
        table,
        entidad_id: id,
        estudiante_id: auth.getUser().id,
      });

      if (response.ok) {
        const json = await response.json();
        console.log(json.message);
        setErrorResponse(json.message);
        handleOpen();
      } else {
        const json = await response.json();
        setErrorResponse(json.error);
        handleOpen();
        console.log(errorResponse);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const [open, setOpen] = React.useState(false);
  const [openCV, setOpenCV] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseCV = () => {
    setOpenCV(false);
  };
  const handleOpenCV = () => {
    setOpenCV(true);
  };

  // Imagen por defecto
  const defaultImage = 'https://th.bing.com/th/id/OIP.JKvRJaNFhDO7nu1s_-zieAHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1,3';
  // Si description.imagen es null, undefined o una cadena vacía, usamos la imagen por defecto
  const imageUrl = description.imagen !== null 
    ? `http://localhost:4000${description.imagen}` 
    : defaultImage;
  console.log("Valor de imageUrl:", imageUrl);

  // Función que retorna el contenido dinámico según la tabla
  const renderContentByTable = () => {
    switch (table) {
      case "ofertas_laborales":
        return (
          <>
            <Typography variant="h2">{description.nombre}</Typography>
            <Typography variant="h6">{description.descripcion}</Typography>
            <Typography variant="body2">
              <strong>Empresa:</strong> {description.empresa}
            </Typography>
            <Typography variant="body2">
              <strong>Fecha:</strong> {`${formatDate(description.fecha_inicio)} - ${formatDate(description.fecha_fin)}`}
            </Typography>
          </>
        );
      case "capacitaciones":
      case "talleres":
      case "voluntariados":
        return (
          <>
            <Typography variant="h2">{description.nombre}</Typography>
            <Typography variant="h6">{description.descripcion}</Typography>
            <Typography variant="body2">
              <strong>Fecha:</strong> {`${formatDate(description.fecha_inicio)} - ${formatDate(description.fecha_fin)}`}
            </Typography>
            {description.lugar && (
              <Typography variant="body2">
                <strong>Lugar:</strong> {description.lugar}
              </Typography>
            )}
            {description.cupo_maximo && (
              <Typography variant="body2">
                <strong>Cupo Máximo:</strong> {description.cupo_maximo}
              </Typography>
            )}
          </>
        );
      default:
        return <Typography variant="h6">Datos no disponibles</Typography>;
    }
  };

  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <Typography variant="h2" sx={{ fontFamily: "Arial" }}>
          {errorResponse}
        </Typography>
      </Backdrop>
      <Grid container sx={{ mx: "auto" }}>
        <Grid
          item
          sm={12}
          md={6}
          lg={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative", // Asegura que el botón pueda posicionarse en el contenedor
            background: ` url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "400px",
            borderRight: "1px solid",
            borderColor: "divider",
            alignItems: "start",
            pt: 4,
            px: 5,
            gap: 2,
          }}
        >
          {/* Botón Regresar dentro de la imagen de fondo */}
          <Button
            startIcon={<ChevronLeftRoundedIcon />}
            onClick={handleBack}
            variant="contained"
            sx={{
              position: "absolute", // Posiciona el botón dentro del contenedor
              top: "20px", // Distancia desde la parte superior
              left: "20px", // Distancia desde la parte izquierda
              zIndex: 1, // Asegura que el botón esté por encima de la imagen
            }}
          >
            Regresar
          </Button>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            {/* Otros botones o contenido */}
          </Box>
        </Grid>
        <Grid
          item
          sm={12}
          md={6}
          lg={7}
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
          {renderContentByTable()}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {auth.getUser()?.type !== "egresado" ? (
              <Button
                variant="contained"
                endIcon={<ChevronRightRoundedIcon />}
                onClick={handleSubscribe}
                sx={{
                  width: "60%",
                  fontSize: "1.2rem",
                  padding: "10px 0",
                }}
              >
                Inscribirse
              </Button>
            ) : (
              <React.Fragment>
                <Button
                  variant="contained"
                  endIcon={<ContactPageIcon />}
                  onClick={handleOpenCV}
                  sx={{
                    width: "60%",
                    fontSize: "1.2rem",
                    padding: "10px 0",
                  }}
                >
                  Generar CV
                </Button>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={openCV}
                >
                  <Box>
                    <FormularioPDF func={handleCloseCV} />
                  </Box>
                </Backdrop>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
