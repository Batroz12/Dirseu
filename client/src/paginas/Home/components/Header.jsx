import React from 'react';
import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import CustomDatePicker from './fecha';
import NavbarBreadcrumbs1 from './NavbarMoviles';
import MenuButton from './notificaciones';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';
import Search from './Search';
import NavbarBreadcrumbs from '../../../components/components/NavbarBreadcrumbs';

const Header = () => {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      {/* <NavbarBreadcrumbs1 /> */}
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        <Search />
        <CustomDatePicker />
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
};

export default Header;
