import { Request, Response } from "express";
import { AppDataSource } from "../database/config";
import { User } from "../database/entities/User";
import { Post } from "../database/entities/Post";

export const createPost = async (req: Request, res: Response) => {
  try {
    const postRepo = AppDataSource.getRepository(Post);
    const userRepo = AppDataSource.getRepository(User);
    const postDataReq = { ...req.body };

    if (postDataReq.userId === null) {
      return res.status(404).json({ message: "Must have a userId" });
    }

    const user = await userRepo.findOneBy({ id: postDataReq.userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPost = postRepo.create(postDataReq);

    await postRepo.save(newPost);

    res.status(201).json(newPost);
  } catch (error) {
    console.log("Error in creating post: ", error);
    res
      .status(500)
      .json({ message: "Internal server error, try again more latter" });
  }
};
