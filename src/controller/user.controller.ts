import { Request, Response } from 'express';
import { UserService } from '../service/user.service';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ message: 'Error creating user', error: error });
    }
  }

  async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userService.getUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching users', error: error });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.getUserById(Number(req.params.id));
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ message: 'Error fetching user', error: error });
    }
  }
}
