import { Request, Response } from 'express';
import { postRepository } from '../../database/repositories/postRepository';

export async function update(req: Request, res: Response): Promise<Response> {
    try {
        const id = parseInt(req.params.id, 10);
        const { title, description } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid post ID' });
        }

        const post = await postRepository.findOne({ where: { id } });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Atualiza apenas os campos necessários
        post.title = title || post.title;
        post.description = description || post.description;

        await postRepository.save(post);

        return res.status(200).json({ post });

    } catch (error) {
        console.error('An error occurred while updating the post:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
