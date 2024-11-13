import { Request, Response } from 'express';
import { userRepository } from '../../database/repositories/userRepository';

export async function update(req: Request, res: Response): Promise<any> {
    
    try {
        const { id } = req.params;
        const { firstName, lastName} = req.body;

        if (!id || !Number(id)) {
            return res.status(400).json({ error: 'Invalid data' });
        }

        const user = await userRepository.findOne({ where: { id: Number(id) } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;

        await userRepository.save(user);

        return res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

}