import { Request, Response } from 'express';
import { userRepository } from '../../database/repositories/userRepository';

export async function findAll(req: Request, res: Response): Promise<any> {
    
    try {
        
        const users = await userRepository.find();

        return res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

}