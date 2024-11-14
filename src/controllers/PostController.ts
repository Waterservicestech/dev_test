import { Request, Response } from "express";
import { AppDataSource } from "../db/conn";
import { Post } from "../entity/Post";
import { User } from "../entity/User";

export class PostController {
    static async create(req: Request, res: Response): Promise<Response> {
        const postRepository = AppDataSource.getRepository(Post);
        const userRepository = AppDataSource.getRepository(User);
        const { title, description, userId } = req.body;

        try {
            const user = await userRepository.findOneBy({ id: userId });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const post = postRepository.create({ title, description, user });
            await postRepository.save(post);

            return res.status(201).json(post);
        } catch (error) {
            console.error("Error creating post:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
