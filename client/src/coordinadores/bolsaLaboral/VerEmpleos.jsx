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
  DialogActions
} from '@mui/material';

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
      console.error('Error al obtener las ofertas laborales:', error.response ? error.response.data : error.message);
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
      if (oferta) {
        await actualizarOfertaLaboral(oferta.id, data);
        alert('Oferta laboral actualizada exitosamente');
      } else {
        await crearOfertaLaboral(data);
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
                  <TableCell>Empresa</TableCell>
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
                    <TableCell>{o.empresa}</TableCell>
                    <TableCell>{new Date(o.fecha_inicio).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(o.fecha_fin).toLocaleDateString()}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mr: 2 }}
                        onClick={() => handleOpenModal(o)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleEliminar(o.id)}
                      >
                        Eliminar
                      </Button>
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
