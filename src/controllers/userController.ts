import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { User } from "../entity/User";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
      return res
        .status(400)
        .json({ error: "firstName, lastName, and email are required" });
    }

    const userRepository = AppDataSource.getRepository(User);

    const userExists = await userRepository.findOne({ where: { email } });
    
    if (userExists) {
      return res.status(409).json({ error: "Email is already in use" });
    }

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    await userRepository.save(user);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create user" });
  }
};
