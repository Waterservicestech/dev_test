import { Request, Response } from "express";
import { PostDTO } from '../dtos/post-dto';
import { PostService } from '../services/post-service';
import { BadRequestError } from '../utils/errors/bad-request-error';
import { NotFoundError } from '../utils/errors/not-found-error';

export class PostController {
  constructor(private postService: PostService) {}

  async store(req: Request, res: Response) {
    try {
      const { title, description, userId } = req.body;
      const postDTO = new PostDTO(title, description, userId)

      const createdPost = await this.postService.createPost(postDTO);
      res.status(201).json(createdPost)
    } catch (error) {
      if (error instanceof BadRequestError || error instanceof NotFoundError) return res.status(error.statusCode).send({ message: error.message })

      console.error("Unexpected error:", error);
      res.status(500).send({ message: "Internal Server Error" })
    }
  }
}