import express from 'express';
import { crearCapacitacion, obtenerCapacitaciones, obtenerCapacitacion, actualizarCapacitacion, eliminarCapacitacion } from '../controllers/capacitacionesController.js';
const router = express.Router();
// Crear un nuevo voluntariado
router.post('/', crearCapacitacion);

// Obtener todos los voluntariados
router.get('/', obtenerCapacitaciones);

// Obtener un voluntariado específico
router.get('/:id', obtenerCapacitacion);

// Actualizar un voluntariado
router.put('/:id', actualizarCapacitacion);

// Eliminar un voluntariado
router.delete('/:id', eliminarCapacitacion);

export default router;