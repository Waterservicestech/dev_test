import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { UserService } from '../services/userService';

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.post('/', userController.createUser.bind(userController));
router.get('/', userController.getAllUsers.bind(userController));

export default router;
