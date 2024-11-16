import { Router } from 'express';
import { createPost } from '../controllers/postsController';

const router = Router();

router.post('/posts', createPost);

export default router;