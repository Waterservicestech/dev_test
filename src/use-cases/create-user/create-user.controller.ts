import { Request, Response } from "express";
import { CreateUserUseCase } from "./create-user.use-case";
import { CreateUserDto } from "./create-user.dto";
import { validate } from "class-validator";

export class UserController {
    
    constructor(private createUserUseCase: CreateUserUseCase) {}

    async addUser(req: Request, res: Response) {
        try {
            const createUserDto = new CreateUserDto(req.body);
            const errors = await validate(createUserDto);

            if(errors.length === 0) {
                const newUser = await this.createUserUseCase.execute(createUserDto);
                return res.status(201).json(newUser);
            }

            return res.status(400).json({ errors: errors});
        } catch(err) {
            return res.status(500).json({ error: 'Erro ao criar usuário' });
        }
    }
}