import express from 'express';

import { crearEvento, obtenerEventos, obtenerEvento, actualizarEvento, eliminarEvento } from '../controllers/eventosController.js';

const router = express.Router();
// Crear un nuevo Evento
router.post('/', crearEvento);

// Obtener todos los Evento
router.get('/', obtenerEventos);

// Obtener un Evento específico
router.get('/:id', obtenerEvento);

// Actualizar un Evento
router.put('/:id', actualizarEvento);

// Eliminar un Evento
router.delete('/:id', eliminarEvento);

export default router;