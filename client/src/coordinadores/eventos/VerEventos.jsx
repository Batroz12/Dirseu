import React, { useEffect, useState } from 'react';
import {
  obtenerEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento
} from '../../api/eventos';
import FormularioEvento from './AgregarEventos';
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
import { Event as EventIcon } from '@mui/icons-material';

// Creación del tema personalizado de MUI
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007BFF', // Azul principal
    },
    secondary: {
      main: '#f50057', // Rosa secundario
    },
  },
});

const EventosPage = () => {
  const [eventos, setEventos] = useState([]);
  const [evento, setEvento] = useState(null); // Evento a editar
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false); // Controla la apertura del modal

  // Función para cargar los eventos
  const cargarEventos = async () => {
    try {
      const response = await obtenerEventos();
      setEventos(response.data);
    } catch (error) {
      console.error('Error al obtener eventos:', error.response ? error.response.data : error.message);
      setError('Error al obtener los eventos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarEventos();
  }, []);

  // Maneja la apertura del modal para crear o editar
  const handleOpenModal = (evento = null) => {
    setEvento(evento);
    setOpenModal(true);
  };

  // Maneja el cierre del modal
  const handleCloseModal = () => {
    setEvento(null);
    setOpenModal(false);
  };

  // Maneja el envío del formulario
  const handleSubmit = async (data) => {
    try {
      if (evento) {
        await actualizarEvento(evento.id, data);
        alert('Evento actualizado exitosamente');
      } else {
        await crearEvento(data);
        alert('Evento creado exitosamente');
      }
      setEvento(null);
      setOpenModal(false);
      await cargarEventos();
    } catch (error) {
      console.error('Error al guardar el evento:', error);
      setError('Error al guardar el evento');
    }
  };

  // Maneja la eliminación de un evento
  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      try {
        await eliminarEvento(id);
        await cargarEventos();
      } catch (error) {
        console.error('Error al eliminar el evento:', error);
        setError('Error al eliminar el evento');
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box p={6} bgcolor="background.default" color="text.primary" minHeight="100vh">
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Lista de Eventos
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
            startIcon={<EventIcon />}
          >
            Agregar Evento
          </Button>
        </Box>

        {/* Tabla de Eventos */}
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
                  <TableCell>Hora</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {eventos.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>{e.nombre}</TableCell>
                    <TableCell>{e.descripcion}</TableCell>
                    <TableCell>{new Date(e.fecha_inicio).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(e.fecha_fin).toLocaleDateString()}</TableCell>
                    <TableCell>{e.lugar}</TableCell>
                    <TableCell>{e.hora}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mr: 2 }}
                        onClick={() => handleOpenModal(e)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleEliminar(e.id)}
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

        {/* Modal para Crear/Editar Evento */}
        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle color="text.primary">
            {evento ? 'Actualizar Evento' : 'Crear Evento'}
          </DialogTitle>
          <DialogContent>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <FormularioEvento
                evento={evento}
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

export default EventosPage;
