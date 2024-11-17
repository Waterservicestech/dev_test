import { UserService } from "../services/UserService";
import { Request, Response } from "express"

export class UserController {
  private userService = new UserService()

  async createUser(req: Request, res: Response) {
    const { firstName, lastName, email } = req.body;

    try {
      const createUser = await this.userService.createUser(firstName, lastName, email)
      return res.status(201).json(createUser)
    } catch(error) {
      console.error("Error while creating user: ", error)
      return res.status(500).json({ message: "Internal Server Error"})
    }
  }
}