import { Request, Response } from "express";
import { AppDataSource } from "../db/conn";
import { User } from "../entity/User";
import { createUserSchema } from "../schema/user.schema";

export class UserController {
    static async create(req: Request, res: Response): Promise<Response> {
        const userRepository = AppDataSource.getRepository(User);

        const result = createUserSchema.safeParse(req);
        if (!result.success) {
            return res.status(400).json({ message: "Validation error", errors: result.error.errors });
        }

        const { firstName, lastName, email } = result.data.body;

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
