// Contiene las rutas de la API.

import { Router } from 'express';
import {
    createStudent,
    createDocente

} from '../controllers/signup.controller.js';

const router = Router();

router.post('/student', createStudent);
router.post('/docente', createDocente);


export default router;