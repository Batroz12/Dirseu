import React, { useEffect, useState } from 'react';
import {
  obtenerTalleres,
  crearTaller,
  actualizarTaller,
  eliminarTaller
} from '../../api/talleres';
import FormularioTaller from './AgregarTalleres';
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

const TallerPage = () => {
  const [talleres, setTalleres] = useState([]);
  const [taller, setTaller] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Función para cargar los talleres
  const cargarTalleres = async () => {
    try {
      const response = await obtenerTalleres();
      setTalleres(response.data);
    } catch (error) {
      console.error('Error al obtener los talleres:', error.response ? error.response.data : error.message);
      setError('Error al obtener los talleres');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarTalleres();
  }, []);

  // Maneja la apertura del modal para crear o editar
  const handleOpenModal = (taller = null) => {
    setTaller(taller);
    setOpenModal(true);
  };

  // Maneja el cierre del modal
  const handleCloseModal = () => {
    setTaller(null);
    setOpenModal(false);
  };

  // Maneja el envío del formulario
  const handleSubmit = async (data) => {
    try {
      if (taller) {
        await actualizarTaller(taller.id, data);
        alert('Taller actualizado exitosamente');
      } else {
        await crearTaller(data);
        alert('Taller creado exitosamente');
      }
      setTaller(null);
      setOpenModal(false);
      await cargarTalleres();
    } catch (error) {
      setError('Error al guardar el taller');
    }
  };

  // Maneja la eliminación de un taller
  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este taller?')) {
      try {
        await eliminarTaller(id);
        await cargarTalleres();
      } catch (error) {
        setError('Error al eliminar el taller');
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box p={6} bgcolor="background.default" color="text.primary" minHeight="100vh">
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Lista de Talleres
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
            Agregar Taller
          </Button>
        </Box>

        {/* Tabla de Talleres */}
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
                {talleres.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.nombre}</TableCell>
                    <TableCell>{t.descripcion}</TableCell>
                    <TableCell>{new Date(t.fecha_inicio).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(t.fecha_fin).toLocaleDateString()}</TableCell>
                    <TableCell>{t.lugar}</TableCell>
                    <TableCell>{t.cupo_maximo}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mr: 2 }}
                        onClick={() => handleOpenModal(t)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleEliminar(t.id)}
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

        {/* Modal para Crear/Editar Taller */}
        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle color="text.primary">
            {taller ? 'Actualizar Taller' : 'Crear Taller'}
          </DialogTitle>
          <DialogContent>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <FormularioTaller
                taller={taller}
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

export default TallerPage;
