import { Request, Response } from "express";
import { CreateUserUseCase } from "./create-user.use-case";
import { CreateUserDto } from "./create-user.dto";

export class UserController {
    
    constructor(private createUserUseCase: CreateUserUseCase) {}

    async addUser(req: Request, res: Response) {
        try {
            const createUserDto = new CreateUserDto
            Object.assign(createUserDto, req.body)

            const newUser = await this.createUserUseCase.execute(createUserDto)
            return res.status(201).json(newUser)
        } catch(err) {
            return res.status(500).json({ error: 'Erro ao criar usuário' })
        }
    }
}