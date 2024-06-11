import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";

import { Box, Typography } from "@mui/material";

import ButtonImgBase from "../components/components/ButtonImgBase";
import { Link, Outlet, useParams } from "react-router-dom";
import { getTableRequest } from "../api/api";

export default function ListModule() {
  const { table } = useParams();

  const [items, setItems] = useState([]);

  useEffect(() => {
    geItems();
  }, [table]);

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
          mb: 4,
        }}
      >
        <Typography component="h1" variant="title1" sx={{ fontWeight: "bold" }}>
          {(table.charAt(0).toUpperCase() + table.slice(1))
            // Reemplaza "_x" por " X" (el carácter después del guion bajo en mayúscula)
            .replace(/_(.)/g, (match, p1) => " " + p1.toUpperCase())
            // Convierte el primer carácter de la cadena resultante a mayúscula
            .replace(/^./, (match) => match.toUpperCase())}
        </Typography>
      </Box>
      {/* cards */}

      <Grid container spacing={2} columns={7} sx={{ textAlign: "center" }}>
        {items.map((item) => (
          <Grid xs={6} sm={3} md={2} lg={2.25} key={item.id}>
            <Box
              sx={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <ButtonImgBase
                title={item.nombre}
                url={data.find((item) => item.title === table)?.image || null}
                width="100%"
                to={`/form/${table}/${item.id}`}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Outlet />
    </React.Fragment>
  );
}

const data = [
  {
    title: "talleres",
    image: "https://tallerdigital.cl/wp-content/uploads/2020/06/movil01.png",
    to: "list/taller",
  },
  {
    title: "capacitaciones",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuKuE9ZF_Roc-2BeI1cpIyOuglFDtq8la_jQ&s",
    to: "",
  },
  {
    title: "ofertas_laborales",
    image:
      "https://www.unp.edu.pe/wp-content/uploads/2023/08/bolsa_trabajo.png",
    to: "",
  },
  {
    title: "voluntariados",
    image:
      "https://blog.oxfamintermon.org/wp-content/uploads/2015/01/voluntariado-europeo-oxfam-intermon-2-726x477.jpg",
    to: "",
  },
];
