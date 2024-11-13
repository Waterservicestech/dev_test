import { Request, Response } from 'express';
import { postRepository } from '../../database/repositories/postRepository';
import { userRepository } from '../../database/repositories/userRepository';

export async function create(req: Request, res: Response): Promise<any> {
    try {
        const { title, description, userId } = req.body;

        if (!title || !description || !userId || isNaN(Number(userId))) {
            return res.status(400).json({ error: 'Missing required information' });
        }

        if (!await userRepository.findOne({where: { id: userId }})) {
            return res.status(404).json({ error: 'User not found' });
        }

        const post = postRepository.create({ title, description, userId: Number(userId) });

        res.status(201).json(
            await postRepository.save(post)
        );

    } catch (error) {
        console.error('An error occurred while creating a post', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}