import React, { useState, useEffect } from 'react';
import { X, Briefcase, Phone, Mail, Info } from 'lucide-react';
import { Typography, Divider, Button, useTheme, MenuItem, Select, InputLabel, FormControl, TextField, Grid } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';

export default function EmpleosConPaginacion() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 12;
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState('');
  const [careers, setCareers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const theme = useTheme();

  const fetchValidJobs = () => {
    fetch('http://localhost:4000/api/empleos')
      .then((response) => response.json())
      .then((data) => setJobs(Array.isArray(data) ? data : []))
      .catch((error) => console.error('Error al cargar las ofertas válidas:', error));
  };

  const fetchJobsByCareerAndDate = (career, date) => {
    let url = 'http://localhost:4000/api/empleos';
    if (career !== '') {
      url = `http://localhost:4000/api/empleos/carrera/${career}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const filteredJobs = Array.isArray(data)
          ? date
            ? data.filter((job) => dayjs(job.fecha_fin).isAfter(dayjs(date)))
            : data
          : [];
        setJobs(filteredJobs);
      })
      .catch((error) => console.error('Error al cargar los trabajos filtrados:', error));
  };

  useEffect(() => {
    fetchValidJobs();
    setCareers([
      'Arquitectura', 'Ingeniería de Sistemas', 'Ingeniería Civil', 'Ingeniería Ambiental', 'Ingeniería Industrial', 
      'Administración de Empresas', 'Economia', 'Contabilidad', 'Marketing', 'Finanzas', 'Adm. Negocios Internacionales', 
      'Derecho', 'Medicina Humana', 'Psicologia', 'Tecnologia Medica', 'Enfermería', 'Estomatología', 'Obstetricia', 
      'Educación', 'Turismo',
    ]);
  }, []);

  const handleCareerChange = (event) => {
    const career = event.target.value;
    setSelectedCareer(career);
    fetchJobsByCareerAndDate(career, selectedDate);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchJobsByCareerAndDate(selectedCareer, date);
  };

  const openModal = (job) => {
    setSelectedJob(job);
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format('DD/MM/YYYY');
  };

  // Logica de la paginacion
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = Array.isArray(jobs) ? jobs.slice(indexOfFirstJob, indexOfLastJob) : [];
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="container mx-auto p-4">
        <h1 className={`text-3xl font-bold mb-4 text-center ${theme.palette.mode === 'dark' ? 'text-blue-400' : 'bg-white text-gray-900'}`}>
          Ofertas de Empleo
        </h1>

        <FormControl fullWidth className="mb-4">
          <Grid container spacing={10}>
            <Grid item xs={10} sm={6}>
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
            
            {/* Filtro por fecha */}
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

        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {currentJobs.length > 0 ? (
            currentJobs.map((job) => (
              <motion.div
                key={job.id}
                className={`p-6 rounded-lg shadow-lg min-h-[180px] min-w-[320px] flex flex-col justify-between ${
                  theme.palette.mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                }`}
                onClick={() => openModal(job)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <h2 className="text-2xl font-semibold mb-2 text-black">{job.nombre}</h2>
                <p className="text-sm mb-2 ">{job.descripcion}</p>
                <Typography variant="body2" className="text-gray-600">
                  <strong>Fechas de postulación:</strong> {`${formatDate(job.fecha_inicio)} - ${formatDate(job.fecha_fin)}`}
                </Typography>
              </motion.div>
            ))
          ) : (
            <Typography variant="body1" className="text-center col-span-3">
              No se encontraron ofertas laborales para esta carrera y fecha.
            </Typography>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          <Button 
            variant="outlined" 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <Typography variant="body2" className="flex items-center">
            Página {currentPage} de {totalPages}
          </Typography>
          <Button 
            variant="outlined" 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
          >
            Siguiente
          </Button>
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
              {/* Contenido del modal */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{selectedJob.nombre}</h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700" aria-label="Cerrar modal">
                  <X size={28} />
                </button>
              </div>
              <Typography variant="h6" className={theme.palette.mode === 'dark' ? 'text-blue-400 mb-2' : 'text-blue-600 mb-2'}>
                <Info size={20} className="inline mr-2" /> Descripción del empleo
              </Typography>
              <p className="mb-1">{selectedJob.descripcion}</p>

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

              {/* <Button variant="contained" color="primary" fullWidth onClick={closeModal}>
                Aplicar
              </Button> */}
            </motion.div>
          </motion.div>
        )}
      </div>
    </LocalizationProvider>
  );
}
