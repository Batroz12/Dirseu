import React, { useEffect, useState } from 'react';
import {
  obtenerCapacitaciones,
  crearCapacitacion,
  actualizarCapacitacion,
  eliminarCapacitacion
} from '../../api/capacitaciones';
import FormularioCapacitacion from './AgregarCapacitaciones';
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

const CapacitacionPage = () => {
  const [capacitaciones, setCapacitaciones] = useState([]);
  const [capacitacion, setCapacitacion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Función para cargar las capacitaciones
  const cargarCapacitaciones = async () => {
    try {
      const response = await obtenerCapacitaciones();
      setCapacitaciones(response.data);
    } catch (error) {
      console.error('Error al obtener las capacitaciones:', error.response ? error.response.data : error.message);
      setError('Error al obtener las capacitaciones');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarCapacitaciones();
  }, []);

  // Maneja la apertura del modal para crear o editar
  const handleOpenModal = (capacitacion = null) => {
    setCapacitacion(capacitacion);
    setOpenModal(true);
  };

  // Maneja el cierre del modal
  const handleCloseModal = () => {
    setCapacitacion(null);
    setOpenModal(false);
  };

  // Maneja el envío del formulario
  const handleSubmit = async (data) => {
    try {
      if (capacitacion) {
        await actualizarCapacitacion(capacitacion.id, data);
        alert('Capacitación actualizada exitosamente');
      } else {
        await crearCapacitacion(data);
        alert('Capacitación creada exitosamente');
      }
      setCapacitacion(null);
      setOpenModal(false);
      await cargarCapacitaciones();
    } catch (error) {
      setError('Error al guardar la capacitación');
    }
  };

  // Maneja la eliminación de una capacitación
  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta capacitación?')) {
      try {
        await eliminarCapacitacion(id);
        await cargarCapacitaciones();
      } catch (error) {
        setError('Error al eliminar la capacitación');
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box p={6} bgcolor="background.default" color="text.primary" minHeight="100vh">
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Lista de Capacitaciones
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
            Agregar Capacitación
          </Button>
        </Box>

        {/* Tabla de Capacitaciones */}
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
                  <TableCell>Fecha Inicio</TableCell>
                  <TableCell>Fecha Fin</TableCell>
                  <TableCell>Lugar</TableCell>
                  <TableCell>Cupo Máximo</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {capacitaciones.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.nombre}</TableCell>
                    <TableCell>{c.descripcion}</TableCell>
                    <TableCell>{new Date(c.fecha_inicio).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(c.fecha_fin).toLocaleDateString()}</TableCell>
                    <TableCell>{c.lugar}</TableCell>
                    <TableCell>{c.cupo_maximo}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mr: 2 }}
                        onClick={() => handleOpenModal(c)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleEliminar(c.id)}
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

        {/* Modal para Crear/Editar Capacitación */}
        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle color="text.primary">
            {capacitacion ? 'Actualizar Capacitación' : 'Crear Capacitación'}
          </DialogTitle>
          <DialogContent>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <FormularioCapacitacion
                capacitacion={capacitacion}
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

export default CapacitacionPage;
