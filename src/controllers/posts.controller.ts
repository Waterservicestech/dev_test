import { PostService } from '../services/posts.service';
export class PostController {
  private PostService = new PostService();

  async createPost(req: any, res: any) {
    const { title, description, userId } = req.body;
    try {
      const savedPost = await this.PostService.createPost(title, description, userId);
      res.status(201).json(savedPost);
    } catch (err) {
      console.error("Error creating post", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}