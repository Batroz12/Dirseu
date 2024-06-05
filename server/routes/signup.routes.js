// Contiene las rutas de la API.

import { Router } from 'express';
import {
    createUser,

} from '../controllers/signup.controller.js';

const router = Router();

router.post('/', createUser);


export default router;