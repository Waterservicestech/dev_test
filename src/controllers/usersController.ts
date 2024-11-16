import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/usersEntity';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email } = req.body;
    const user = AppDataSource.getRepository(User).create({ firstName, lastName, email });
    await AppDataSource.getRepository(User).save(user);
    return res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Error creating user" });
  }
};