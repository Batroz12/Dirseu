import * as React from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { Card as MuiCard } from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";

import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import PersonIcon from "@mui/icons-material/Person";
import { Link, Outlet } from "react-router-dom";

const Card = styled(MuiCard)(({ theme, selected }) => ({
  border: "1px solid",
  borderColor: theme.palette.divider,
  width: "100%",
  textDecoration: "none",
  "&:hover": {
    background:
      theme.palette.mode === "light"
        ? "linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)"
        : "linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)",
    borderColor:
      theme.palette.mode === "light" ? "primary.light" : "primary.dark",
    boxShadow:
      theme.palette.mode === "light"
        ? "0px 2px 8px hsla(0, 0%, 0%, 0.1)"
        : "0px 1px 8px hsla(210, 100%, 25%, 0.5) ",
  },
  [theme.breakpoints.up("md")]: {
    flexGrow: 1,
    maxWidth: `calc(50% - ${theme.spacing(1)})`,
  },
  ...(selected && {
    backgroundColor: theme.palette.action.selected,
    borderColor:
      theme.palette.mode === "light"
        ? theme.palette.primary.light
        : theme.palette.primary.dark,
  }),
}));

export default function TypeUserTab() {
  const [paymentType, setPaymentType] = React.useState("creditCard");

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          aria-label="Payment options"
          name="paymentType"
          value={paymentType}
          onChange={handlePaymentTypeChange}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Card
            selected={paymentType === "creditCard"}
            component={Link}
            to=""
            sx={{}}
          >
            <CardActionArea
              onClick={() => setPaymentType("creditCard")}
              sx={{
                ".MuiCardActionArea-focusHighlight": {
                  backgroundColor: "transparent",
                },
                "&:focus-visible": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <PersonIcon
                  fontSize="small"
                  sx={(theme) => ({
                    color:
                      theme.palette.mode === "light" ? "grey.400" : "grey.600",
                    ...(paymentType === "creditCard" && {
                      color: "primary.main",
                    }),
                  })}
                />
                <Typography fontWeight="medium">Estudiante</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card
            selected={paymentType === "bankTransfer"}
            component={Link}
            to="teacher"
          >
            <CardActionArea
              onClick={() => setPaymentType("bankTransfer")}
              sx={{
                ".MuiCardActionArea-focusHighlight": {
                  backgroundColor: "transparent",
                },
                "&:focus-visible": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <LocalLibraryIcon
                  fontSize="small"
                  sx={(theme) => ({
                    color:
                      theme.palette.mode === "light" ? "grey.400" : "grey.600",
                    ...(paymentType === "bankTransfer" && {
                      color: "primary.main",
                    }),
                  })}
                />
                <Typography fontWeight="medium">Docente</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </RadioGroup>
      </FormControl>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Outlet />
      </Box>
    </Stack>
  );
}
