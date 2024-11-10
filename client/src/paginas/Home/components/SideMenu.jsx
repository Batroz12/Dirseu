import * as React from 'react';

import { useAuth } from '../../../context/AuthProvider';
import { Link } from "react-router-dom";

import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import SelectContent from './SelectContent';
import MenuContent from './MenuContent';
import CardAlert from './CardAlert';
import OptionsMenu from './OptionsMenu';

function stringToColor(string) {
  let hash = 0;
  // Calcula un valor hash basado en el string
  for (let i = 0; i < string.length; i++) {
    // Suma los códigos ASCII de los caracteres y aplica desplazamiento a la izquierda y resta
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convierte el hash en un color hexadecimal
  const color = `#${((hash & 0x00ffffff) | 0x1000000).toString(16).slice(1)}`;
  return color;
}

function stringAvatar(name) {
  const initials = name.match(/\b\w/g).slice(0, 2).join("");
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
}
const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  const auth = useAuth();
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.alternate',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
        }}
      >
        <SelectContent />
      </Box>
      <Divider />
      <MenuContent />
      {/* <CardAlert /> */}
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
            sizes="small"
            alt="Riley Carter"
            sx={{
              width: 24,
              height: 24,
              mr: 1,
            }}
            {...stringAvatar(
              `${auth.getUser()?.firstName} ${auth.getUser()?.lastName}`
            )}
        />
        <Typography component="p" variant="subtitle2" sx={{ ml: 2 }}>
            {auth.getUser()?.firstName || ""}
        </Typography>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}