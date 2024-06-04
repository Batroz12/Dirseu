import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Divider from "@mui/material/Divider";

import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import {
  Padding,
  ShoppingCartRounded,
  StarBorderPurple500TwoTone,
} from "@mui/icons-material";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconEmpty": {
    color: "#e3a601", // Cambia el color de los corazones vacíos a amarillo
  },
  "& .MuiRating-iconFilled": {
    color: "#444444",
  },
  "& .MuiRating-iconHover": {
    color: "#000000",
  },
});

const Ptarjeta = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const { detalles, color, imagen, nombre, boton1 } = props;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card
        sx={{
          width: 220,
          backgroundColor: "#fff",
          border: "3px solid #222222",
          borderBottomRightRadius: 20,
          borderTopLeftRadius: 20,
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <CardContent
          sx={{
            py: 1,
            backgroundColor: "#222222",
            color: "#fff",
            border: "3px solid #222222",
            borderBottomRightRadius: 40,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              fontSize: "1rem",
              noWrap: true,
            }}
          >
            {nombre}
          </Typography>
        </CardContent>

        <CardMedia
          onClick={handleExpandClick}
          component="img"
          height="200"
          image={imagen}
          sx={{
            padding: "10px 0",
          }}
        />

        <CardActions disableSpacing sx={{ px: 2 }}>
          <Button
            disableElevation
            sx={{ padding: 0 }}
            startIcon={
              <ShoppingCartRounded
                sx={{
                  fontSize: "25px",
                  paddingBottom: "2px",
                  color: color,
                  marginRight: "auto",
                }}
              />
            }
          >
            <Typography style={{ fontSize: "12px", color: color }}>
              {boton1}
            </Typography>
          </Button>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              marginLeft: "auto",
              borderColor: "#999",
            }}
          />
          <StyledRating
            name="customized-color"
            defaultValue={2}
            size="small"
            getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            sx={{ marginLeft: "auto" }}
          />
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent
            sx={{
              backgroundColor: "#222222",
              color: "#fff",
              border: "3px solid #222222",
              borderTopLeftRadius: 40,
            }}
          >
            <Typography
              textAlign={"left"}
              sx={{
                textAlign: "center",
              }}
            >
              {detalles}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

export default Ptarjeta;
