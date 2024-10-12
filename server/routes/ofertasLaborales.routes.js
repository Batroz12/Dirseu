import express from 'express';
import { crearOfertaLaboral, obtenerOfertasLaborales, obtenerOfertaLaboral, actualizarOfertaLaboral, eliminarOfertaLaboral } from '../controllers/ofertasLaboralesController.js';

const router = express.Router();
// Crear un nuevo OfertaLaboral
router.post('/', crearOfertaLaboral);

// Obtener todos las OfertaLaboral
router.get('/', obtenerOfertasLaborales);

// Obtener una OfertaLaboral específico
router.get('/:id', obtenerOfertaLaboral);

// Actualizar una OfertaLaboral
router.put('/:id', actualizarOfertaLaboral);

// Eliminar una OfertaLaboral
router.delete('/:id', eliminarOfertaLaboral);

export default router;