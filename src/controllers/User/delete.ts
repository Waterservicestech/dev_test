import { Request, Response } from 'express';
import { userRepository } from '../../database/repositories/userRepository';

export async function deleteById(req: Request, res: Response): Promise<any> {
    
    try {
        const { id } = req.params;

        if (!id || !Number(id)) {
            return res.status(400).json({ error: 'Invalid data' });
        }

        if (! await userRepository.findOne({ where: { id: Number(id) } })) {
            return res.status(404).json({ error: 'User not found' });
        }

        await userRepository.delete({ id: Number(id) });

        return res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

}