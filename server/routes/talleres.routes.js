import express from 'express';
import { crearTaller, obtenerTalleres, obtenerTaller, actualizarTaller, eliminarTaller } from '../controllers/talleresController.js';

const router = express.Router();
// Crear un nuevo Taller
router.post('/', crearTaller);

// Obtener todos los Talleres
router.get('/', obtenerTalleres);

// Obtener un Taller específico
router.get('/:id', obtenerTaller);

// Actualizar un Taller
router.put('/:id', actualizarTaller);

// Eliminar un Taller
router.delete('/:id', eliminarTaller);

export default router;