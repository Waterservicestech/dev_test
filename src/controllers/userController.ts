import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../services/userService';

export default class UserController {
    constructor(
        private userService = new UserService(),
    ) { }

    public async createUser(req: Request, res: Response) {
        const serviceResponse = await this.userService.createUser(req.body);
        return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
}