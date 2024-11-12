import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Post } from "../entity/Post";
import { User } from "../entity/User";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, description, userId } = req.body;

    if (!title || !description || !userId) {
      return res
        .status(400)
        .json({ error: "title, description, and userId are required" });
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const post = new Post();
    post.title = title;
    post.description = description;
    post.userId = userId;

    const postRepository = AppDataSource.getRepository(Post);
    await postRepository.save(post);

    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create post" });
  }
};
