import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Slider(props) {
  const { list, id, name, img } = props;

  return (
    <List
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        columnGap: 2,
        overflowX: "auto",
      }}
    >
      {list.map((item) => (
        <ListItem key={item[id]} sx={{ p: 0 }}>
          <ListItemButton sx={{ p: 0 }}>
            <Card
              sx={{
                width: 100,
                height: 133,
                backgroundColor: "#fff",
                padding: 2,
                borderRadius: 0,
              }}
            >
              <CardMedia
                component="img"
                height="100"
                image={item[img]}
                sx={{
                  padding: 0,
                  marginBottom: 1,
                }}
              />
              <CardContent
                sx={{
                  padding: 0, // Eliminar el padding de CardContent
                  "&:last-child": {
                    paddingBottom: 0, // Eliminar el padding adicional en el último hijo
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: "0.8rem",
                    p: 0,
                    m: 0,
                    fontFamily: "EQ3-Book,Helvetica", // Cambia la fuente a Helvetica
                  }}
                >
                  {item[name]}
                </Typography>
              </CardContent>
            </Card>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
