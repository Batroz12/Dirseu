import { Router } from 'express';
import {
    getTable,

} from '../controllers/Tables.controller.js';

const router = Router();

router.post('/get-table', getTable);



export default router;