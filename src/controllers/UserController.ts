import { Request, Response, Router } from 'express';
import UserRepository from '../repositories/UserRepository';

const userRouter = Router();

userRouter.get('/', async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await UserRepository.getUsers();
        return res.status(200).json(users);
    } catch (err) {
        console.log("Error: ", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

userRouter.post('/', async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await UserRepository.createUser(req.body);
        return res.status(201).json(user);
    } catch (err) {
        console.log("Error: ", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

export default userRouter;