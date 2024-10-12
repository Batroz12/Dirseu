import express from 'express';
import { crearVoluntariado, obtenerVoluntariados, obtenerVoluntariado, actualizarVoluntariado, eliminarVoluntariado } from '../controllers/voluntariadosController.js';

const router = express.Router();
// Crear un nuevo voluntariado
router.post('/', crearVoluntariado);

// Obtener todos los voluntariados
router.get('/', obtenerVoluntariados);

// Obtener un voluntariado específico
router.get('/:id', obtenerVoluntariado);

// Actualizar un voluntariado
router.put('/:id', actualizarVoluntariado);

// Eliminar un voluntariado
router.delete('/:id', eliminarVoluntariado);

export default router;