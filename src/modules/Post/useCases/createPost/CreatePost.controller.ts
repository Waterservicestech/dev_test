import { Response, Request } from "express";

import { createPostInputValidator } from "./CreatePost.validator";
import { CreatePostService } from "./CreatePost.service";
import { HttpException } from "../../../../@shared/errors/HttpException";

export class CreatePostController {
    constructor(
        private createPostService: CreatePostService,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { data, success } = createPostInputValidator.safeParse(request.body)

        if (!success) {
            throw new HttpException('Invalid input.', 400)
        }

        const { title, description, userId } = data;

        const post = await this.createPostService.execute({ title, description, userId });

        return response.status(201).json(post)
    }
}