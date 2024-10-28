import React, { useState, useEffect } from 'react';
import { X, Briefcase, Phone, Mail, Info } from 'lucide-react';
import { Typography, Divider, Button, useTheme, MenuItem, Select, InputLabel, FormControl, TextField, Grid } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Adaptador para dayjs
import { motion } from 'framer-motion';
import dayjs from 'dayjs'; // Importar dayjs

export default function EmpleosConModal() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(''); // Estado para la carrera seleccionada
  const [careers, setCareers] = useState([]); // Estado para almacenar las opciones de carreras disponibles
  const [selectedDate, setSelectedDate] = useState(null); // Estado para almacenar la fecha seleccionada

  const theme = useTheme();

  // Función para obtener todas las ofertas laborales válidas
  const fetchValidJobs = () => {
    fetch('http://localhost:4000/api/empleos') // Conectar con el endpoint de ofertas válidas
      .then((response) => response.json())
      .then((data) => setJobs(data)) // Actualiza el estado con ofertas válidas
      .catch((error) => console.error('Error al cargar las ofertas válidas:', error));
  };

  // Función para obtener ofertas laborales filtradas por carrera y fecha
  const fetchJobsByCareerAndDate = (career, date) => {
    let url = 'http://localhost:4000/api/empleos';
    if (career !== '') {
      url = `http://localhost:4000/api/empleos/carrera/${career}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (date) {
          const filteredJobs = data.filter((job) => dayjs(job.fecha_fin).isAfter(dayjs(date))); // Usar dayjs para comparar fechas
          setJobs(filteredJobs);
        } else {
          setJobs(data);
        }
      })
      .catch((error) => console.error('Error al cargar los trabajos filtrados:', error));
  };

  useEffect(() => {
    // Cargar todas las ofertas laborales válidas al iniciar
    fetchValidJobs();

    // Cargar las carreras disponibles (esto puede venir de un endpoint o ser estático)
    setCareers([
      'Ingeniería de Sistemas',
      'Ingeniería Industrial',
      'Administración de Empresas',
      'Derecho',
      // Agrega más carreras según sea necesario
    ]);
  }, []);

  const handleCareerChange = (event) => {
    const career = event.target.value;
    setSelectedCareer(career); // Actualizar la carrera seleccionada
    fetchJobsByCareerAndDate(career, selectedDate); // Filtrar las ofertas por carrera y fecha seleccionada
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchJobsByCareerAndDate(selectedCareer, date); // Filtrar las ofertas por carrera y fecha seleccionada
  };

  const openModal = (job) => {
    setSelectedJob(job);
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format('DD/MM/YYYY'); // Usar dayjs para formatear la fecha
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}> {/* Envuelve el componente con LocalizationProvider */}
      <div className="container mx-auto p-4">
        <h1 className={`text-3xl font-bold mb-4 text-center ${theme.palette.mode === 'dark' ? 'text-blue-400' : 'bg-white text-gray-900'}`}>
          Ofertas de Empleo
        </h1>

        {/* Filtros dentro de un FormControl */}
        <FormControl fullWidth className="mb-4">
          <Grid container spacing={2}>
            {/* Filtro de carrera */}
            <Grid item xs={12} sm={6}>
              <InputLabel id="carrera-label">Filtrar por carrera</InputLabel>
              <Select
                labelId="carrera-label"
                value={selectedCareer}
                label="Filtrar por carrera"
                onChange={handleCareerChange}
                fullWidth
              >
                <MenuItem value="">Todas las carreras</MenuItem>
                {careers.map((career) => (
                  <MenuItem key={career} value={career}>
                    {career}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {/* Filtro de fecha */}
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Filtrar por fecha"
                value={selectedDate}
                onChange={(newDate) => handleDateChange(newDate)}
                slots={{ textField: (props) => <TextField {...props} fullWidth /> }}
              />
            </Grid>
          </Grid>
        </FormControl>

        {/* Sección con margen superior */}
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job.id}
                className={`p-10 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow min-h-[180px] min-w-[440px] ${
                  theme.palette.mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                }`}
                onClick={() => openModal(job)}
              >
                <h2 className={`text-2xl font-bold mb-2 ${theme.palette.mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {job.nombre}
                </h2>

                <p className={`${theme.palette.mode === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  {job.descripcion}
                </p>

                <Typography variant="body2" className={theme.palette.mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  <strong>Fechas de postulación:</strong> {`${formatDate(job.fecha_inicio)} - ${formatDate(job.fecha_fin)}`}
                </Typography>
              </div>
            ))
          ) : (
            <Typography variant="body1" className="text-center col-span-3">
              No se encontraron ofertas laborales para esta carrera y fecha.
            </Typography>
          )}
        </div>

        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className={`rounded-xl p-8 shadow-lg max-w-lg w-full ${
                theme.palette.mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-2xl font-bold ${theme.palette.mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {selectedJob.nombre}
                </h2>

                <button
                  onClick={closeModal}
                  className={`${theme.palette.mode === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                  aria-label="Cerrar modal"
                >
                  <X size={28} />
                </button>
              </div>
              <Typography variant="h6" className={theme.palette.mode === 'dark' ? 'text-blue-400 mb-2' : 'text-blue-600 mb-2'}>
                <Info size={20} className="inline mr-2" /> Descripción del empleo
              </Typography>
              <p className="mb-4">{selectedJob.descripcion}</p>

              <Divider className="my-4" />

              <Typography variant="h6" className={theme.palette.mode === 'dark' ? 'text-blue-400 mb-2' : 'text-blue-600 mb-2'}>
                <Briefcase size={20} className="inline mr-2" /> Información de la Empresa
              </Typography>
              <p className="mb-2"><strong>Empresa:</strong> {selectedJob.empresa}</p>
              <p className="mb-2"><strong>Carrera Destino:</strong> {selectedJob.carrera_destino}</p>

              <Divider className="my-4" />

              <Typography variant="h6" className={theme.palette.mode === 'dark' ? 'text-blue-400 mb-2' : 'text-blue-600 mb-2'}>
                <Phone size={20} className="inline mr-2" /> Contacto
              </Typography>
              <p className="mb-2"><strong>Teléfono:</strong> {selectedJob.nro_contacto}</p>
              <p className="mb-4"><Mail size={20} className="inline mr-2" /> {selectedJob.correo_contacto}</p>

              <Divider className="my-4" />

              <Typography variant="h6" className={theme.palette.mode === 'dark' ? 'text-blue-400 mb-2' : 'text-blue-600 mb-2'}>
                Fechas de Postulación
              </Typography>
              <p className="mb-4">
                <strong>Desde:</strong> {formatDate(selectedJob.fecha_inicio)}<br />
                <strong>Hasta:</strong> {formatDate(selectedJob.fecha_fin)}
              </p>

              <Button variant="contained" color="primary" fullWidth onClick={closeModal}>
                Aplicar
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </LocalizationProvider>
  );
}
