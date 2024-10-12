import axios from 'axios';
const API_URL = 'http://localhost:4000/api/ofertas/';

export const obtenerOfertasLaborales = () => axios.get(API_URL);
export const obtenerOfertasLaboral = (id) => axios.get(`${API_URL}/${id}`);
export const crearOfertaLaboral = (oferta) => axios.post(API_URL, oferta);
export const actualizarOfertaLaboral = (id, oferta) => axios.put(`${API_URL}/${id}`, oferta);
export const eliminarOfertaLaboral  = (id) => axios.delete(`${API_URL}/${id}`);