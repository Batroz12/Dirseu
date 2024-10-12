import axios from 'axios';
const API_URL = 'http://localhost:4000/api/talleres/';

export const obtenerTalleres = () => axios.get(API_URL);
export const obtenerTaller = (id) => axios.get(`${API_URL}/${id}`);
export const crearTaller = (taller) => axios.post(API_URL, taller);
export const actualizarTaller = (id, taller) => axios.put(`${API_URL}/${id}`, taller);
export const eliminarTaller = (id) => axios.delete(`${API_URL}/${id}`);