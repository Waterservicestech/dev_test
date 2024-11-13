
import { Router } from 'express';
import { UserController } from '../controllers/User';
import { PostController } from '../controllers/Pots';

const router = Router();

// rotas de usuários
router.post('/users', UserController.create)
router.get('/users', UserController.findAll)
router.get('/users/:id', UserController.findOne)
router.put('/users/:id', UserController.update)
router.delete('/users/:id', UserController.deleteById)


// rotas de posts
router.post('/posts', PostController.create)
router.get('/posts', PostController.findAll)
router.get('/posts/:id', PostController.findOne)
router.put('/posts/:id', PostController.update)
router.delete('/posts/:id', PostController.deleteById)


export default router;