import { Request, Response } from "express";
import { CreatePostUseCase } from "./create-post.use-case";
import { CreatePostDto } from "./create-post.dto";
import { validate } from "class-validator";

export class PostController {
    
    constructor(private createPostUseCase: CreatePostUseCase) {}

    async addPost(req: Request, res: Response) {
        try {
            const createPostDto = new CreatePostDto(req.body);
            const errors = await validate(createPostDto);

            if(errors.length === 0) {
                const newPost = await this.createPostUseCase.execute(createPostDto);
                return res.status(201).json(newPost);
            }

            return res.status(400).json({ errors: errors });

        } catch(err) {
            return res.status(500).json({ error: 'Erro ao criar post' });
        }
    }
}