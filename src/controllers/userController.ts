import { Request, Response } from 'express';
import { mapErrorToStatusCode } from '../utils/functions';
import { User } from '../entity/User';
import { AppDataSource } from '../config/database';
import { UserService } from '../services/userService';

export class UserController {
  private userService: UserService;

  constructor() {
    const userRepository = AppDataSource.getRepository(User);
    this.userService = new UserService({ userRepository });
  }

  async create(req: Request, res: Response) {
    try {
      const { firstName, lastName, email } = req.body;

      const result = await this.userService.create({
        firstName,
        lastName,
        email,
      });

      if (result.success) {
        return res.status(201).json(result.data);
      }

      if (result.error) {
        const statusCode = mapErrorToStatusCode(result.error?.code);
        return res.status(statusCode).json({ error: result.error });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}
