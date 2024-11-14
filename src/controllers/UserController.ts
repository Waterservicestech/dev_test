import { Request, Response } from "express";
import { AppDataSource } from "../db/conn";
import { User } from "../entity/User";

export class UserController {
    static async create(req: Request, res: Response): Promise<Response> {
        const userRepository = AppDataSource.getRepository(User);
        const { firstName, lastName, email } = req.body;

        try {
            const user = userRepository.create({ firstName, lastName, email });
            await userRepository.save(user);

            return res.status(201).json({ message: "User created successfully", user });
        } catch (error) {
            console.error("Error creating user:", error);
            return res.status(400).json({ message: "Error creating user" });
        }
    }
}
