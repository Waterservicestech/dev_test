import { Request, Response } from 'express';
import { PostService } from '../services/postService';

export class PostController {
    constructor(private postService: PostService) {}

    async createPost(req: Request, res: Response): Promise<Response> {
        try {
            const { title, description, userId } = req.body;
            const post = await this.postService.createPost({ title, description, userId });
            return res.status(201).send(post);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).send({ message: error.message });
            }
            return res.status(500).send({ message: 'Unknown error' });
        }
    }

    async getAllPosts(req: Request, res: Response): Promise<Response> {
        try {
            const posts = await this.postService.getAllPosts();
            return res.status(200).json(posts);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).send({ message: error.message });
            }
            return res.status(500).send({ message: 'Unknown error' });
        }
    }
}
