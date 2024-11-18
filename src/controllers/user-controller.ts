import { Request, Response } from "express";
import { UserDTO } from '../dtos/user-dto';
import { UserService } from '../services/user-service';
import { BadRequestError } from '../utils/errors/bad-request-error';

export class UserController {
  constructor(private userService: UserService) {}

  async store(req: Request, res: Response) {
    try {
      const { firstName, lastName, email } = req.body;
      const userDTO = new UserDTO(firstName, lastName, email)

      const createdUser = await this.userService.createUser(userDTO);
      res.status(201).json(createdUser)
    } catch (error) {
      if (error instanceof BadRequestError) return res.status(error.statusCode).send({ message: error.message })

      console.error("Unexpected error:", error);
      res.status(500).send({ message: "Internal Server Error" })
    }
  }
}