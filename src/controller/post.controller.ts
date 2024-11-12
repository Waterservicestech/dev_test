import { Request, Response } from 'express';
import { PostService } from '../service/post.service';

export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  async createPost(req: Request, res: Response): Promise<Response> {
    try {
      const post = await this.postService.createPost(req.body);
      return res.status(201).json(post);
    } catch (error) {
      console.error('Error creating post:', error);
      return res.status(500).json({ message: 'Error creating post', error: error });
    }
  }

  async getPosts(req: Request, res: Response): Promise<Response> {
    try {
      const posts = await this.postService.getPosts();
      return res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      return res.status(500).json({ message: 'Error fetching posts', error: error });
    }
  }

  async getPostById(req: Request, res: Response): Promise<Response> {
    try {
      const post = await this.postService.getPostById(Number(req.params.id));
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      return res.status(200).json(post);
    } catch (error) {
      console.error('Error fetching post:', error);
      return res.status(500).json({ message: 'Error fetching post', error: error });
    }
  }
}
