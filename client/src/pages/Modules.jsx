import React from "react";
import Grid from "@mui/material/Unstable_Grid2";

import { Box, Card, Typography } from "@mui/material";

import ButtonImgBase from "../components/components/ButtonImgBase";
import { Outlet } from "react-router-dom";

export default function Modules() {
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          my: 2,
        }}
      >
        <Typography component="h1" variant="title1" sx={{ fontWeight: "bold" }}>
          MODULOS
        </Typography>
      </Box>
      {/* cards */}

      <Grid container spacing={2} columns={9} sx={{ textAlign: "center" }}>
        {data.map((card, index) => (
          <Grid xs={6} sm={3} md={2} lg={2.25}>
            <Card variant="outlined" sx={{ height: "100%", flexGrow: 1 }}>
              <ButtonImgBase
                title={card.title}
                url={card.image}
                width="100%"
                to={card.to}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
      <Outlet />
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
