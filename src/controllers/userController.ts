import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
    constructor(private userService: UserService) {}

    async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const user = await this.userService.createUser(req.body);
            return res.status(201).send(user);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).send({ message: error.message });
            }
            return res.status(500).send({ message: 'Unknown error' });
        }
    }

    async getAllUsers(_req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.userService.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).send({ message: error.message });
            }
            return res.status(500).send({ message: 'Unknown error' });
        }
    }
}
