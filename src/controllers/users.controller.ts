import { validate } from 'class-validator';
import { UserService } from '../services/users.service';
import { NextFunction } from 'express';
import { CreateUserDto } from '../dto/createUserDto';

export class UserController {
  private UserService = new UserService();

  async createUser(req: any, res: any, next: NextFunction) {
    const { firstName, lastName, email } = req.body;

    const createUserDto = new CreateUserDto();

    createUserDto.firstName = firstName;
    createUserDto.lastName = lastName;
    createUserDto.email = email;

    const errors = await validate(createUserDto);

    if (errors.length > 0) {
      return next(errors);
    }

    try {
      const savedUser = await this.UserService.createUser(firstName, lastName, email);
      res.status(201).json(savedUser);
    } catch (err) {
      console.error("Error creating user", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}