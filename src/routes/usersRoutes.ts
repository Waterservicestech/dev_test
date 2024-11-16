import { Router } from 'express';
import { createUser } from '../controllers/usersController';

const router = Router();

router.post('/users', createUser);

export default router;