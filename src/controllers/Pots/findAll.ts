import { Request, Response } from 'express';
import { postRepository } from '../../database/repositories/postRepository';

export async function findAll(req: Request, res: Response): Promise<any> {
    try {
        
        res.status(200).json(
            await postRepository.find()
        );

    } catch (error) {
        console.error('An error occurred while creating a post', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}