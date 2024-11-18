import { Request, Response, Router } from 'express';
import PostRepository from '../repositories/PostRepository';

const postRouter = Router();

postRouter.get('/', async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await PostRepository.getPosts();
        return res.status(200).json(users);
    } catch (err) {
        console.log("Error: ", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

postRouter.post('/', async (req: Request, res: Response): Promise<Response> => {
    try {
        const post = await PostRepository.createPost(req.body);
        return res.status(201).json(post);
    } catch (err) {
        console.log("Error: ", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

export default postRouter;