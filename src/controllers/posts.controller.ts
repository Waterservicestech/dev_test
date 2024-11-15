import { validate } from 'class-validator';
import { CreatePostDto } from '../dto/createPostDto';
import { PostService } from '../services/posts.service';
import { NextFunction } from 'express';

export class PostController {
  private PostService = new PostService();

  async createPost(req: any, res: any, next: NextFunction) {
    const { title, description, userId } = req.body;

    const createPostDto = new CreatePostDto();

    createPostDto.title = title;
    createPostDto.description = description;
    createPostDto.userId = userId;

    const errors = await validate(createPostDto);

    if (errors.length > 0) {
      return next(errors);
    }
  
    try {
      const savedPost = await this.PostService.createPost(title, description, userId);
      res.status(201).json(savedPost);
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      return res.status(statusCode).json({ message: error.message || 'Internal Server Error' });
    }
  }
}