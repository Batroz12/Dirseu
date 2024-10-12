import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider';

// Función para generar atributos de accesibilidad
function a11yProps(index) {
  return {
    id: `menu-item-${index}`,
    'aria-controls': `menu-itempanel-${index}`,
  };
}

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, link: '' },
  { text: 'Analitica', icon: <AnalyticsRoundedIcon />, link: 'analytics', condition: (auth) => auth.getUser()?.type === 'docente' || auth.isAdmin },
  { text: 'Coordinadores', icon: <PeopleRoundedIcon />, subItems: [
      { text: 'Desarrollo Formativo', link: 'coordinadores/DesarrolloFormativo' },
      { text: 'Desarrollo Sostenible', link: 'coordinadores/DesarrolloSostenible' },
      { text: 'Extensión Universitaria', link: 'coordinadores/ExtensionUniversitaria' },
      { text: 'Seguimiento al Egresado', link: 'coordinadores/SeguimientoEgresado' }
    ], condition: (auth) => auth.isAdmin
  },
  { text: 'Inscripciones', icon: <AssignmentRoundedIcon />, link: 'inscripciones', condition: (auth) => auth.getUser()?.type === 'docente' || auth.isAdmin },
  { text: 'Modulos', icon: <AssignmentRoundedIcon />, link: 'modules' },
];

const secondaryListItems = [
  { text: 'Configuración', icon: <SettingsRoundedIcon /> },
  { text: 'Acerca', icon: <InfoRoundedIcon /> },
  { text: 'Retroalimentación', icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
  const [open, setOpen] = React.useState(false);
  const [openAdministradores, setOpenAdministradores] = React.useState(false); // Estado para el submenú
  const auth = useAuth();
  const [value, setValue] = React.useState(0); // Estado para el elemento seleccionado

  const handleChange = (index) => {
    setValue(index); // Cambiar el valor seleccionado
  };

  const handleAdministradoresClick = () => {
    setOpenAdministradores(!openAdministradores); // Abrir o cerrar el submenú
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      {/* Lista principal */}
      <List dense>
        {mainListItems
          .filter(item => !item.condition || item.condition(auth)) // Filtrar según la condición
          .map((item, index) => (
            <React.Fragment key={index}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                {item.subItems ? ( // Si hay subItems, mostrar el menú desplegable
                  <>
                    <ListItemButton
                      selected={value === index}
                      onClick={handleAdministradoresClick} // Controlar la apertura del submenú
                      {...a11yProps(index)} // Atributos de accesibilidad
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                      {openAdministradores ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openAdministradores} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.subItems.map((subItem, subIndex) => (
                          <ListItemButton
                            key={subIndex}
                            sx={{ pl: 4 }}
                            component={Link}
                            to={subItem.link}
                          >
                            <ListItemText primary={subItem.text} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <ListItemButton
                    selected={value === index}
                    onClick={() => handleChange(index)}
                    component={Link}
                    to={item.link}
                    {...a11yProps(index)} // Atributos de accesibilidad
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                )}
              </ListItem>
            </React.Fragment>
          ))}
      </List>

      {/* Lista secundaria */}
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index + mainListItems.length} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={value === index + mainListItems.length}
              onClick={() => handleChange(index + mainListItems.length)}
              component={Link}
              to={item.link}
              {...a11yProps(index + mainListItems.length)} // Atributos de accesibilidad
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
