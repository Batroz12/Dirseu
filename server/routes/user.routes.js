import { Router } from 'express';
import {
    refreshUser,

} from '../controllers/user.controller.js';

const router = Router();

router.get('/', refreshUser);



export default router;