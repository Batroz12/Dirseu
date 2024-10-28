import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import {
  Business as BusinessIcon,
  ErrorOutline as ErrorOutlineIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
} from '@mui/icons-material';

const FormularioOfertaLaboral = ({ oferta, onSubmit }) => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    id: '', // Incluye el campo ID si es necesario para identificar la oferta
    nombre: '',
    descripcion: '',
    requisitos: '',
    carrera_destino: '',
    empresa: '',
    nro_contacto: '',
    correo_contacto: '',
    fecha_inicio: '',
    fecha_fin: '',
    imagen: null, // Estado para la imagen
  });

  // Estados para manejar errores y mensajes de éxito
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Efecto para inicializar formData cuando cambia la oferta laboral
  useEffect(() => {
    if (oferta) {
      setFormData({
        id: oferta.id || '', // Asigna el ID cuando existe la oferta
        nombre: oferta.nombre || '',
        descripcion: oferta.descripcion || '',
        requisitos: oferta.requisitos || '',
        carrera_destino: oferta.carrera_destino || '',
        empresa: oferta.empresa || '',
        nro_contacto: oferta.nro_contacto || '',
        correo_contacto: oferta.correo_contacto || '',
        fecha_inicio: oferta.fecha_inicio ? oferta.fecha_inicio.split('T')[0] : '',
        fecha_fin: oferta.fecha_fin ? oferta.fecha_fin.split('T')[0] : '',
        imagen: null, // Reiniciar la imagen al editar
      });
    } else {
      setFormData({
        id: '',
        nombre: '',
        descripcion: '',
        requisitos: '',
        carrera_destino: '',
        empresa: '',
        nro_contacto: '',
        correo_contacto: '',
        fecha_inicio: '',
        fecha_fin: '',
        imagen: null, // Reiniciar la imagen al crear
      });
    }
  }, [oferta]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      imagen: file,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (
      !formData.nombre ||
      !formData.empresa ||
      !formData.fecha_inicio ||
      !formData.fecha_fin ||
      !formData.requisitos ||
      !formData.carrera_destino ||
      !formData.nro_contacto ||
      !formData.correo_contacto
    ) {
      setError('Por favor, completa todos los campos obligatorios.');
      setSuccess(false);
      return;
    }

    // Si la validación pasa
    setError('');
    setSuccess(true);
    onSubmit(formData);

    // Resetear el formulario si es para crear una nueva oferta laboral
    if (!oferta) {
      setFormData({
        id: '',
        nombre: '',
        descripcion: '',
        requisitos: '',
        carrera_destino: '',
        empresa: '',
        nro_contacto: '',
        correo_contacto: '',
        fecha_inicio: '',
        fecha_fin: '',
        imagen: null,
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
        <BusinessIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h5" component="h2" color="text.primary">
          {oferta ? 'Actualizar Oferta Laboral' : 'Agregar Oferta Laboral'}
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
          ¡Éxito! La oferta laboral ha sido{' '}
          {oferta ? 'actualizada' : 'agregada'} correctamente.
        </Alert>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          {/* Campo de Nombre */}
          <TextField
            label="Nombre de la oferta laboral*"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Ej: Desarrollador Web"
            fullWidth
          />

          {/* Campo de Descripción */}
          <TextField
            label="Descripción"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Describe los detalles de la oferta laboral"
            multiline
            rows={4}
            fullWidth
          />

          {/* Campo de Requisitos */}
          <TextField
            label="Requisitos*"
            id="requisitos"
            name="requisitos"
            value={formData.requisitos}
            onChange={handleChange}
            required
            placeholder="Ej: Conocimientos en React"
            fullWidth
          />

          {/* Campo de Carrera Destino */}
          <TextField
            label="Carrera Destino*"
            id="carrera_destino"
            name="carrera_destino"
            value={formData.carrera_destino}
            onChange={handleChange}
            required
            placeholder="Ej: Ingeniería de Sistemas"
            fullWidth
          />

          {/* Campo de Empresa */}
          <TextField
            label="Empresa*"
            id="empresa"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            required
            placeholder="Ej: Empresa XYZ"
            fullWidth
          />

          {/* Campo de Número de contacto */}
          <TextField
            label="Número de contacto*"
            id="nro_contacto"
            name="nro_contacto"
            value={formData.nro_contacto}
            onChange={handleChange}
            required
            placeholder="Ej: 987654321"
            fullWidth
          />

          {/* Campo de Correo de contacto */}
          <TextField
            label="Correo de contacto*"
            id="correo_contacto"
            name="correo_contacto"
            value={formData.correo_contacto}
            onChange={handleChange}
            required
            type="email"
            placeholder="Ej: contacto@empresa.com"
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

          {/* Campo para subir imagen */}
          <Button
            variant="outlined"
            component="label"
            sx={{ mt: 2 }}
          >
            Subir Imagen
            <input
              type="file"
              name="imagen"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
          {formData.imagen && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Imagen seleccionada: {formData.imagen.name}
            </Typography>
          )}
          
          {/* Botón de enviar */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            {oferta ? 'Actualizar Oferta Laboral' : 'Agregar Oferta Laboral'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default FormularioOfertaLaboral;
