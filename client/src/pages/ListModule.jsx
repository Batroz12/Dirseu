import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";

import { Box, Card, Typography } from "@mui/material";

import ButtonImgBase from "../components/components/ButtonImgBase";
import { Outlet, useParams } from "react-router-dom";
import { getTableRequest } from "../api/api";

export default function ListModule() {
  const { module, table } = useParams();

  const [items, setItems] = useState([]);

  useEffect(() => {
    geItems();
  }, [module, table]);

  // geItems();

  async function geItems() {
    try {
      const response = await getTableRequest({ table });
      console.log(response);

      if (response.ok) {
        console.log("Tabla Recuperada");
        // setErrorResponse("");
        const json = await response.json();
        setItems(json.rows);
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

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          my: 4,
        }}
      >
        <Typography component="h1" variant="title1" sx={{ fontWeight: "bold" }}>
          {module}
        </Typography>
      </Box>
      {/* cards */}

      <Grid
        container
        spacing={2}
        columns={7}
        sx={{ textAlign: "center", px: "10%" }}
      >
        {items.map((item) => (
          <Grid xs={6} sm={3} md={2} lg={2.25} key={item.id}>
            <Card variant="outlined" sx={{ height: "100%", flexGrow: 1 }}>
              <ButtonImgBase
                title={item.nombre}
                url={data.find((item) => item.title === module)?.image || null}
                width="100%"
                to=""
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
    title: "Talleres",
    image: "https://tallerdigital.cl/wp-content/uploads/2020/06/movil01.png",
    to: "list/taller",
  },
  {
    title: "Capacitaciones",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuKuE9ZF_Roc-2BeI1cpIyOuglFDtq8la_jQ&s",
    to: "",
  },
  {
    title: "Ofertas Laborales",
    image:
      "https://www.unp.edu.pe/wp-content/uploads/2023/08/bolsa_trabajo.png",
    to: "",
  },
  {
    title: "Voluntariados",
    image:
      "https://blog.oxfamintermon.org/wp-content/uploads/2015/01/voluntariado-europeo-oxfam-intermon-2-726x477.jpg",
    to: "",
  },
];
