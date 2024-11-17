import { PostService } from "../services/PostService";
import { Request, Response } from "express"

export class PostController {
  private postService = new PostService()

  async createPost(req: Request, res: Response) {
    const { title, description, userId } = req.body;

    try {
      const createPost = await this.postService.createPost(title, description, userId)
      return res.status(201).json(createPost)
    } catch (error) {
      console.error("Error while creating post: ", error)
      return res.status(500).json({ message: "Internal Server Error"})
    }
  }
}