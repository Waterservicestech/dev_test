import { Router } from 'express';
import { createPost } from '../controllers/postController';

const router = Router();

router.post('/posts', createPost);

export default router;
