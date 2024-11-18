import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import PostService from '../services/postService';

export default class PostController {
    constructor(
        private postService = new PostService(),
    ) { }

    public async createPost(req: Request, res: Response) {
        const serviceResponse = await this.postService.createPost(req.body);
        return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
}