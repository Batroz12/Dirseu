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

  const navigate = useNavigate(); // Obtiene el objeto history
  const auth = useAuth();

  useEffect(() => {
    getDescription();
  }, [table, id]);

  async function getDescription() {
    try {
      const response = await getTableByIdRequest({ table, id });

      if (response.ok) {
        console.log("Info Recuperada");
        // setErrorResponse("");
        const json = await response.json();
        setDescription(json.data);
        console.log(json.data);
      } else {
        console.log("Algo Ocurrio");
        const json = await response.json();
        // setErrorResponse(json.error);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleBack = () => {
    navigate(-1); // Navegar hacia atrás
  };

  const handleSubscribe = async () => {
    try {
      if (auth.getUser().type != "estudiante") {
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

    // navigate(-1); // Navegar a la ruta "address"
  };

  const itemData = data.find((d) => d.title === table);
  const backgroundImage = itemData ? itemData.image : "";

  // Function to format dates
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
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            borderRight: "1px solid",
            borderColor: "divider",
            alignItems: "start",
            pt: 4,
            px: 5,
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            <Button
              startIcon={<ChevronLeftRoundedIcon />}
              onClick={handleBack}
              variant="contained"
              sx={{
                display: { xs: "none", sm: "flex" },
              }}
            >
              Regresar
            </Button>

            <Button
              startIcon={<ChevronLeftRoundedIcon />}
              onClick={handleBack}
              variant="outlined"
              fullWidth
              sx={{
                display: { xs: "flex", sm: "none" },
              }}
            />
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
          <Typography variant="h2" sx={{ fontFamily: "Arial" }}>
            {description.nombre}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              ml: 5,
              pl: 2,
              borderLeft: "4px solid",
              borderColor: "primary.main",
            }}
          >
            <Typography variant="h6" component="p">
              {description.descripcion}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <EventIcon color="action" />
              <Typography variant="body2" component="p">
                <strong>Fecha:</strong>{" "}
                {`${formatDate(description.fecha_inicio)} - ${formatDate(
                  description.fecha_fin
                )}`}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <LocationOnIcon color="action" />
              <Typography variant="body2" component="p">
                <strong>Lugar:</strong> {description.lugar}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <GroupIcon color="action" />
              <Typography variant="body2" component="p">
                <strong>Cupo Máximo:</strong> {description.cupo_maximo}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {auth.getUser()?.type != "egresado" ? (
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

const data = [
  {
    title: "talleres",
    image: "https://tallerdigital.cl/wp-content/uploads/2020/06/movil01.png",
  },
  {
    title: "capacitaciones",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuKuE9ZF_Roc-2BeI1cpIyOuglFDtq8la_jQ&s",
  },
  {
    title: "ofertas_laborales",
    image:
      "https://www.unp.edu.pe/wp-content/uploads/2023/08/bolsa_trabajo.png",
  },
  {
    title: "voluntariados",
    image:
      "https://blog.oxfamintermon.org/wp-content/uploads/2015/01/voluntariado-europeo-oxfam-intermon-2-726x477.jpg",
  },
];
