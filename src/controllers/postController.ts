import { Request, Response } from 'express';
import {
  BAD_REQUEST_STATUS_CODE,
  CREATED_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
} from '../utils/constants';
import { User } from '../entity/User';
import { AppDataSource } from '../config/database';
import { Post } from '../entity/Post';
import { mapErrorToStatusCode } from '../utils/functions';
import { PostService } from '../services/postService';

export class PostController {
  private postService: PostService;

  constructor() {
    const userRepository = AppDataSource.getRepository(User);
    const postRepository = AppDataSource.getRepository(Post);
    this.postService = new PostService({ postRepository, userRepository });
  }

  async create(req: Request, res: Response) {
    try {
      const { title, description, userId } = req.body;

      const result = await this.postService.create({
        title,
        description,
        userId,
      });

      if (result.success) {
        return res.status(201).json(result.data);
      }

      if (result.error) {
        const statusCode = mapErrorToStatusCode(result.error?.code);
        return res.status(statusCode).json({ error: result.error });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

export const registerPost = async (req: Request, res: Response) => {
  const postRepository = await AppDataSource.getRepository(Post);
  const userRepository = await AppDataSource.getRepository(User);

  const { title, description, userId } = req.body;

  try {
    const user = await userRepository.findOneBy({ id: userId });

    if (!user)
      return res
        .status(BAD_REQUEST_STATUS_CODE)
        .json({ error: 'User not exists' });

    const post = new Post();

    post.title = title;
    post.description = description;
    post.user = user;

    await postRepository.save(post);

    return res.status(CREATED_STATUS_CODE).json(post);
  } catch (error) {
    console.error(error);
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .json({ error: 'Internal server error' });
  }
};
