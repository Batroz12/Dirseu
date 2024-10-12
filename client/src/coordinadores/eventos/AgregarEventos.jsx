import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import {
  Event as EventIcon,
  ErrorOutline as ErrorOutlineIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
} from '@mui/icons-material';

const FormularioEvento = ({ evento, onSubmit }) => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    lugar: '',
    hora: '',
    cupo_maximo: '',
  });

  // Estados para manejar errores y mensajes de éxito
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Efecto para inicializar formData cuando cambia evento
  useEffect(() => {
    if (evento) {
      setFormData({
        nombre: evento.nombre || '',
        descripcion: evento.descripcion || '',
        fecha_inicio: evento.fecha_inicio
          ? evento.fecha_inicio.split('T')[0]
          : '',
        fecha_fin: evento.fecha_fin
          ? evento.fecha_fin.split('T')[0]
          : '',
        lugar: evento.lugar || '',
        hora: evento.hora || '',
        cupo_maximo: evento.cupo_maximo || '',
      });
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        lugar: '',
        hora: '',
        cupo_maximo: '',
      });
    }
  }, [evento]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (
      !formData.nombre ||
      !formData.fecha_inicio ||
      !formData.fecha_fin ||
      !formData.lugar ||
      !formData.hora ||
      !formData.cupo_maximo
    ) {
      setError('Por favor, completa todos los campos obligatorios.');
      setSuccess(false);
      return;
    }

    if (
      isNaN(formData.cupo_maximo) ||
      parseInt(formData.cupo_maximo) <= 0
    ) {
      setError('El cupo máximo debe ser un número positivo.');
      setSuccess(false);
      return;
    }

    // Si la validación pasa
    setError('');
    setSuccess(true);
    onSubmit(formData);

    // Resetear el formulario si es para crear un nuevo evento
    if (!evento) {
      setFormData({
        nombre: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        lugar: '',
        hora: '',
        cupo_maximo: '',
      });
    }
  };

  return (
    <Box
      maxWidth="md"
      mx="auto"
      mt={4}
      p={4}
      bgcolor="background.paper"
      boxShadow={3}
      borderRadius={2}
    >
      {/* Título del formulario con icono */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={3}
      >
        <EventIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h5" component="h2" color="text.primary">
          {evento ? 'Actualizar Evento' : 'Agregar Evento'}
        </Typography>
      </Box>

      {/* Mostrar mensaje de error si existe */}
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          icon={<ErrorOutlineIcon />}
        >
          {error}
        </Alert>
      )}

      {/* Mostrar mensaje de éxito si existe */}
      {success && (
        <Alert
          severity="success"
          sx={{ mb: 2 }}
          icon={<CheckCircleOutlineIcon />}
        >
          ¡Éxito! El evento ha sido {evento ? 'actualizado' : 'agregado'} correctamente.
        </Alert>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          {/* Campo de Nombre */}
          <TextField
            label="Nombre del evento*"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Ej: Conferencia de React"
            fullWidth
          />

          {/* Campo de Descripción */}
          <TextField
            label="Descripción"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Describe los detalles del evento"
            multiline
            rows={4}
            fullWidth
          />

          {/* Campo de Fecha de inicio */}
          <TextField
            label="Fecha de inicio*"
            id="fecha_inicio"
            name="fecha_inicio"
            type="date"
            value={formData.fecha_inicio}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          {/* Campo de Fecha de fin */}
          <TextField
            label="Fecha de fin*"
            id="fecha_fin"
            name="fecha_fin"
            type="date"
            value={formData.fecha_fin}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          {/* Campo de Lugar */}
          <TextField
            label="Lugar*"
            id="lugar"
            name="lugar"
            value={formData.lugar}
            onChange={handleChange}
            required
            placeholder="Ej: Auditorio Principal"
            fullWidth
          />

          {/* Campo de Hora */}
          <TextField
            label="Hora*"
            id="hora"
            name="hora"
            type="time"
            value={formData.hora}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          {/* Campo de Cupo máximo */}
          <TextField
            label="Cupo máximo*"
            id="cupo_maximo"
            name="cupo_maximo"
            type="number"
            value={formData.cupo_maximo}
            onChange={handleChange}
            required
            placeholder="Ej: 100"
            inputProps={{ min: 1 }}
            fullWidth
          />

          {/* Botón de enviar */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<EventIcon />}
            sx={{ mt: 2 }}
          >
            {evento ? 'Actualizar Evento' : 'Agregar Evento'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default FormularioEvento;
