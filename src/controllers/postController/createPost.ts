import { Request, Response } from 'express';
import { AppDataSource } from '../../db/dataSource';
import { Post } from '../../entity/Post';
import { User } from '../../entity/User';

const postRepository = AppDataSource.getRepository(Post);
const userRepository = AppDataSource.getRepository(User);

export const createPost = async (req: Request, res: Response) => {

    try {
        const { title, description, userId } = req.body;

        if (!title || !description || !userId) {
            return res
                .status(400)
                .json({ error: "title, description and userId are required" });
        }

        const user = await userRepository.findOneBy({ id: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const post = new Post();
        post.title = title;
        post.description = description;
        post.user = user;

        await postRepository.save(post);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: "Error creating post", error });
    }
};
