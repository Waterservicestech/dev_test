import { Request, Response } from 'express';
import { AppDataSource } from '../../db/dataSource';
import { User } from '../../entity/User';

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email } = req.body;

        if (!firstName || !lastName || !email) {
            return res
                .status(400)
                .json({ error: "firstName, lastName and email are required" });
        }

        const userExists = await userRepository.findOneBy({ email: email });

        if (userExists) {
            return res.status(409).json({ error: "This email is already in use" });
        }

        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        
        await userRepository.save(user);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};
