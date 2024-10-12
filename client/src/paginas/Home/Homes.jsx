import * as React from 'react';

import { Outlet } from "react-router-dom";

import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/BarraDesplegable';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import AppTheme from './shared-theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';
import VoluntariadoPage from '../../coordinadores/Voluntariados/voluntariado';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
            padding: 2, // Ajusta el padding si es necesario
          })}
        >
          <Stack
            spacing={2}
            sx={{
              width: '100%', // Asegúrate de que el Stack ocupe todo el ancho
              pb: 10,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Outlet />
            {/* <VoluntariadoPage /> */}
            {/* <MainGrid /> */}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
