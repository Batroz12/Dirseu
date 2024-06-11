import { Router } from 'express';
import {
    getTables,
    getUsersByInscription,
    getModule,
    registerIncription,

} from '../controllers/Tables.controller.js';

const router = Router();

router.post('/get-table', getTables);
router.post('/get-module', getModule);
router.post('/users-inscription', getUsersByInscription);
router.post('/register-inscription', registerIncription);



export default router;