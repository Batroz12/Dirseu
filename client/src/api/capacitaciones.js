import axios from 'axios';

const API_URL = 'http://localhost:4000/api/capacitaciones/';

export const obtenerCapacitaciones = () => axios.get(API_URL);
export const obtenerCapacitacion = (id) => axios.get(`${API_URL}/${id}`);
export const crearCapacitacion = (capacitacion) => axios.post(API_URL, capacitacion);
export const actualizarCapacitacion = (id, capacitacion) => axios.put(`${API_URL}/${id}`, capacitacion);
export const eliminarCapacitacion = (id) => axios.delete(`${API_URL}/${id}`);