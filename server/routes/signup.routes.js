// Contiene las rutas de la API.

import { Router } from 'express';
import {
    createStudent,
    createEgresado,
    createDocente

} from '../controllers/signup.controller.js';

const router = Router();

router.post('/student', createStudent);
router.post('/egresado', createEgresado);
router.post('/docente', createDocente);


export default router;