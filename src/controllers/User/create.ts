import { Request, Response } from 'express';
import { userRepository } from '../../database/repositories/userRepository';

export async function create(req: Request, res: Response): Promise<any> {
    try {
        const { firstName, lastName, email } = req.body;

        if (!firstName || !lastName || !email) {
            return res.status(400).json({ error: 'Missing required information' });
        }

        if (await userRepository.findOne({ where: { email } })) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const user = userRepository.create({ firstName, lastName, email });

        res.status(201).json(
            await userRepository.save(user)
        );
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

}