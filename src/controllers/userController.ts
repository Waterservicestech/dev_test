import { Request, Response } from "express";
import { AppDataSource } from "../database/config";
import { User } from "../database/entities/User";

export const createUser = async (req: Request, res: Response) => {
  try {
    const userRepo = AppDataSource.getRepository(User);
    const userDataReq = { ...req.body };
    const user = await userRepo.findOneBy({ email: userDataReq.email });

    if (user) {
      return res.status(500).json({ message: "The user has already created" });
    }

    const newUser = userRepo.create(userDataReq);

    await userRepo.save(newUser);

    res.status(201).json(newUser);
  } catch (error) {
    console.log("Error creating user: ", error);
    res
      .status(500)
      .json({ message: "Internal server error, try again more latter" });
  }
};
