import { Request, Response } from 'express';
import { userRepository } from '../../database/repositories/userRepository';

export async function findOne(req: Request, res: Response): Promise<any> {
    
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'Missing required information' });
        }

        const user = await userRepository.findOne({ where: { id: Number(id) } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

}