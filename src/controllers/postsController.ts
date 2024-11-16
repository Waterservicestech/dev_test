// src/controllers/postController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Post } from '../entity/postsEntity';
import { User } from '../entity/usersEntity';

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, description, userId } = req.body;
    const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const post = AppDataSource.getRepository(Post).create({ title, description, user });
    await AppDataSource.getRepository(Post).save(post);
    return res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ error: "Error creating post" });
  }
};