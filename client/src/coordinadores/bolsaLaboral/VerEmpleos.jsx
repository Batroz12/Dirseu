import React, { useEffect, useState } from 'react';
import {
  obtenerOfertasLaborales,
  crearOfertaLaboral,
  actualizarOfertaLaboral,
  eliminarOfertaLaboral
} from '../../api/empleos'; // Cambia los importes a la API de ofertas laborales
import FormularioOferta from './AgregarEmpleos'; // Componente de formulario para agregar ofertas
import {
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
  ThemeProvider,
  createTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'; // Importar íconos de Material UI

// Creación del tema personalizado de MUI
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007BFF',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const OfertaLaboralPage = () => {
  const [ofertas, setOfertas] = useState([]);
  const [oferta, setOferta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Función para cargar las ofertas laborales
  const cargarOfertasLaborales = async () => {
    try {
      const response = await obtenerOfertasLaborales();
      setOfertas(response.data);
    } catch (error) {
      setError('Error al obtener las ofertas laborales');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarOfertasLaborales();
  }, []);

  // Maneja la apertura del modal para crear o editar
  const handleOpenModal = (oferta = null) => {
    setOferta(oferta);
    setOpenModal(true);
  };

  // Maneja el cierre del modal
  const handleCloseModal = () => {
    setOferta(null);
    setOpenModal(false);
  };

  // Maneja el envío del formulario
  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('nombre', data.nombre);
      formData.append('descripcion', data.descripcion);
      formData.append('requisitos', data.requisitos); // Nuevo campo
      formData.append('carrera_destino', data.carrera_destino); // Nuevo campo
      formData.append('empresa', data.empresa);
      formData.append('nro_contacto', data.nro_contacto); // Nuevo campo
      formData.append('correo_contacto', data.correo_contacto); // Nuevo campo
      formData.append('fecha_inicio', data.fecha_inicio);
      formData.append('fecha_fin', data.fecha_fin);
      if (data.imagen) {
        formData.append('imagen', data.imagen);
      }

      if (oferta) {
        await actualizarOfertaLaboral(oferta.id, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Oferta laboral actualizada exitosamente');
      } else {
        await crearOfertaLaboral(formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Oferta laboral creada exitosamente');
      }
      setOferta(null);
      setOpenModal(false);
      await cargarOfertasLaborales();
    } catch (error) {
      setError('Error al guardar la oferta laboral');
    }
  };

  // Maneja la eliminación de una oferta laboral
  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta oferta laboral?')) {
      try {
        await eliminarOfertaLaboral(id);
        await cargarOfertasLaborales();
      } catch (error) {
        setError('Error al eliminar la oferta laboral');
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box p={6} bgcolor="background.default" color="text.primary" minHeight="100vh">
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Lista de Ofertas Laborales
        </Typography>

        {error && (
          <Typography color="error" gutterBottom align="center">
            {error}
          </Typography>
        )}

        {/* Botón para abrir el modal de creación */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal()}
          >
            Agregar Oferta Laboral
          </Button>
        </Box>

        {/* Tabla de Ofertas Laborales */}
        {isLoading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Requisitos</TableCell> {/* Nuevo campo */}
                  <TableCell>Empresa</TableCell>
                  <TableCell>Carrera Destino</TableCell> {/* Nuevo campo */}
                  <TableCell>Número de Contacto</TableCell> {/* Nuevo campo */}
                  <TableCell>Correo de Contacto</TableCell> {/* Nuevo campo */}
                  <TableCell>Fecha Inicio</TableCell>
                  <TableCell>Fecha Fin</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ofertas.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell>{o.nombre}</TableCell>
                    <TableCell>{o.descripcion}</TableCell>
                    <TableCell>{o.requisitos}</TableCell> {/* Nuevo campo */}
                    <TableCell>{o.empresa}</TableCell>
                    <TableCell>{o.carrera_destino}</TableCell> {/* Nuevo campo */}
                    <TableCell>{o.nro_contacto}</TableCell> {/* Nuevo campo */}
                    <TableCell>{o.correo_contacto}</TableCell> {/* Nuevo campo */}
                    <TableCell>{new Date(o.fecha_inicio).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(o.fecha_fin).toLocaleDateString()}</TableCell>
                    <TableCell align="center">
                      {/* Ícono de Editar */}
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenModal(o)}
                      >
                        <EditIcon />
                      </IconButton>
                      {/* Ícono de Eliminar */}
                      <IconButton
                        color="secondary"
                        onClick={() => handleEliminar(o.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Modal para Crear/Editar Oferta Laboral */}
        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle color="text.primary">
            {oferta ? 'Actualizar Oferta Laboral' : 'Crear Oferta Laboral'}
          </DialogTitle>
          <DialogContent>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <FormularioOferta
                oferta={oferta}
                onSubmit={handleSubmit}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="secondary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default OfertaLaboralPage;
