import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";

export default function ListCategories(props) {
  const { list, id, name } = props;
  const [open, setOpen] = React.useState(true);
  const [checked, setChecked] = React.useState([0]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Box>
      <Typography
        variant="body2"
        sx={{
          textAlign: "left",
          fontSize: "1.1rem",
          fontWeight: "bolder ",
          marginBottom: "30px",
        }}
      >
        CATEGORIAS
      </Typography>
      <List sx={{ width: "100%" }} aria-labelledby="nested-list-subheader">
        <ListItemButton
          onClick={handleClick}
          sx={{
            py: 0,
            "&:hover": {
              backgroundColor: "transparent", // Quitar el fondo al hacer hover
            },
          }}
        >
          <ListItemText
            primary="Fierros"
            primaryTypographyProps={{
              fontSize: 15,
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
            secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
            secondaryTypographyProps={{
              paddingLeft: 1,
              paddingRight: 2,
              noWrap: true,
              fontSize: 11,
              lineHeight: open ? "0" : "16px",
              color: open ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.5)",
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              opacity: 1,
              transform: open ? "rotate(-180deg)" : "rotate(0)",
              transition: "0.2s",
              textAlign: "left",
            }}
          />
        </ListItemButton>
        {/* Sublista */}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {list.map((item) => {
              const labelId = `checkbox-list-label-${item[id]}`;

              return (
                <ListItem key={item[id]} disablePadding sx={{ paddingLeft: 2 }}>
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(item[id])}
                    sx={{
                      py: 0,
                      "&:hover": {
                        backgroundColor: "transparent", // Quitar el fondo al hacer hover
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={checked.indexOf(item[id]) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                        size="small"
                        sx={{
                          padding: 0,
                          color: "#e3a601",
                          "&.Mui-checked": {
                            color: "#222222", // Color cuando está activo
                          },
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={`${item[name]}`}
                      primaryTypographyProps={{
                        fontSize: 13,
                      }}
                      sx={{
                        marginLeft: -3.5,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </List>
    </Box>
  );
}
