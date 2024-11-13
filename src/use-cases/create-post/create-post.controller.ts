import { Request, Response } from "express";
import { CreatePostUseCase } from "./create-post.use-case";
import { CreatePostDto } from "./create-post.dto";

export class PostController {
    
    constructor(private createPostUseCase: CreatePostUseCase) {}

    async addPost(req: Request, res: Response) {
        try {
            const createPostDto = new CreatePostDto
            Object.assign(createPostDto, req.body)

            const newPost = await this.createPostUseCase.execute(createPostDto)
            return res.status(201).json(newPost)
        } catch(err) {
            return res.status(500).json({ error: 'Erro ao criar post' })
        }
    }
}