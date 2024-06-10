import { Router } from 'express';
import {
    refreshUser,
    getUserInfo

} from '../controllers/user.controller.js';

const router = Router();

router.get('/', refreshUser);
router.get('/info', getUserInfo);



export default router;