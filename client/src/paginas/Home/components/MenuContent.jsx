import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider';
import { useTheme } from '@mui/material/styles';

function a11yProps(index) {
  return {
    id: `menu-item-${index}`,
    'aria-controls': `menu-itempanel-${index}`,
  };
}

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, link: '' },
  // { 
  //   text: 'Analitica', 
  //   icon: <AnalyticsRoundedIcon />, 
  //   link: 'analytics', 
  //   condition: (auth) => auth.getUser()?.type === 'coordinador' || auth.isAdmin 
  // },
  { 
    text: 'Coordinadores', 
    icon: <PeopleRoundedIcon />, 
    subItems: [
      { text: 'Desarrollo Formativo', link: 'coordinadores/DesarrolloFormativo' },
      { text: 'Desarrollo Sostenible', link: 'coordinadores/DesarrolloSostenible' },
      { text: 'Extensión Universitaria', link: 'coordinadores/ExtensionUniversitaria' },
      { text: 'Seguimiento al Egresado', link: 'coordinadores/SeguimientoEgresado' }
    ], 
    condition: (auth) => auth.isAdmin || auth.getUser()?.type === 'coordinador' 
  },
  { 
    text: 'Empleador', 
    icon: <PeopleRoundedIcon />, 
    link: 'empleador/dashboard',
    condition: (auth) => auth.isAdmin || auth.getUser()?.type === 'empleador'
  },
  { 
    text: 'Inscripciones', 
    icon: <AssignmentRoundedIcon />, 
    link: 'inscripciones', 
    condition: (auth) => auth.isAdmin
  },
  { 
    text: 'Modulos', 
    icon: <AssignmentRoundedIcon />, 
    link: 'modules', 
    condition: (auth) => 
      auth.getUser()?.type === 'docente' || 
      auth.getUser()?.type === 'estudiante' ||
      auth.isAdmin 
  },
  {
    text: 'Instructores',
    icon: <AssignmentRoundedIcon />,
    link: 'instructor',
    condition: (auth) =>
      auth.getUser()?.type === 'instructor' ||
      auth.isAdmin
  },
];

const secondaryListItems = [
  { text: 'Configuración', icon: <SettingsRoundedIcon /> },
  { text: 'Acerca', icon: <InfoRoundedIcon /> },
  { text: 'Retroalimentación', icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
  const auth = useAuth();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const location = useLocation(); // Utilizar para obtener la ruta actual

  const handleChange = (index) => {
    setValue(index);
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems
          .filter((item) => !item.condition || item.condition(auth))
          .map((item, index) => (
            <React.Fragment key={index}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                {item.subItems ? (
                  <>
                    <ListItemButton
                      selected={value === index}
                      {...a11yProps(index)}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        sx={{ color: theme.palette.text.primary }}
                      />
                    </ListItemButton>
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem, subIndex) => (
                        <ListItemButton
                          key={subIndex}
                          sx={{
                            pl: 4,
                            bgcolor: location.pathname.includes(subItem.link) ? theme.palette.action.selected : 'transparent',
                            '& .MuiListItemText-root': {
                              color: location.pathname.includes(subItem.link) ? 'black' : theme.palette.text.primary,
                            },
                          }}
                          component={Link}
                          to={subItem.link}
                          onClick={() => handleChange(index)}
                        >
                          <ListItemText primary={subItem.text} />
                        </ListItemButton>
                      ))}
                    </List>
                  </>
                ) : (
                  <ListItemButton
                    selected={value === index}
                    onClick={() => handleChange(index)}
                    component={Link}
                    to={item.link}
                    {...a11yProps(index)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ color: theme.palette.text.primary }}
                    />
                  </ListItemButton>
                )}
              </ListItem>
            </React.Fragment>
          ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index + mainListItems.length} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={value === index + mainListItems.length}
              onClick={() => handleChange(index + mainListItems.length)}
              component={Link}
              to={item.link}
              {...a11yProps(index + mainListItems.length)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ color: theme.palette.text.primary }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
