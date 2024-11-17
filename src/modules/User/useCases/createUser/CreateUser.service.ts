import { HttpException } from "../../../../@shared/errors/HttpException";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    firstName: string;
    lastName: string;
    email: string
}

export class CreateUserService {
    constructor(private usersRepository: IUsersRepository) {}

    async execute({ email, firstName, lastName }: IRequest): Promise<User> {
        const userExists = await this.usersRepository.findByEmail(email);

        if (userExists) {
            throw new HttpException('User already exists', 401);
        }

        const user = await this.usersRepository.create({ email, firstName, lastName });

        return user;
    }
}