import { Request, Response } from 'express';
import { postRepository } from '../../database/repositories/postRepository';

export async function deleteById(req: Request, res: Response): Promise<any> {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'Invalid Id' });
        }

        const post = await postRepository.findOne({ where: { id: Number(id) } });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        await postRepository.remove(post);

        res.status(200).json({ message: 'Post deleted' });


    } catch (error) {
        console.error('An error occurred while creating a post', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}