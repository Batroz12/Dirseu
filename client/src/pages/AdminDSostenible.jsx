import React from 'react';
import {
  AppBar, Toolbar, Typography, Container, Grid, Menu, MenuItem, Button, Box,
  useTheme, ThemeProvider, CssBaseline
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const AdministrarDSostenible = () => {
  const [anchorEls, setAnchorEls] = React.useState([null]);
  const theme = useTheme();

  const handleClick = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleClose = (index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };

  const menuItems = [
    {
      title: 'Voluntariado',
      options: ['Ver Inscritos', 'Agregar Voluntariados', 'Ver Voluntariados'],
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Texto del Panel de Control alineado a la izquierda */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Panel de Control
          </Typography>
          {/* Botón desplegable alineado a la derecha */}
          <Box sx={{ display: 'flex' }}>
            {menuItems.map((menu, index) => (
              <Box key={index} sx={{ ml: 2 }}>
                <Button
                  aria-controls={`menu-${index}`}
                  aria-haspopup="true"
                  onClick={(event) => handleClick(event, index)}
                  endIcon={<ExpandMoreIcon />}
                  variant="contained"
                  color="secondary"
                >
                  {menu.title}
                </Button>
                <Menu
                  id={`menu-${index}`}
                  anchorEl={anchorEls[index]}
                  keepMounted
                  open={Boolean(anchorEls[index])}
                  onClose={() => handleClose(index)}
                >
                  {menu.options.map((option, optionIndex) => (
                    <MenuItem key={optionIndex} onClick={() => handleClose(index)}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {/* Contenido adicional puede ir aquí */}
      </Container>
    </ThemeProvider>
  );
};

export default AdministrarDSostenible;
