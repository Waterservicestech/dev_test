import { CreateUserDto } from "./create-user.dto";
import { User } from "../../entity/User";
import { IUserRepository } from "../../repository/interface/user.interface.repository";

export class CreateUserUseCase {
    
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(createUserDto: CreateUserDto){
        try {
            const newUser = new User(
                createUserDto.firstName,
                createUserDto.lastName,
                createUserDto.email
            );

            return await this.userRepository.createUser(newUser);

        } catch(err) {
            return err;
        }
    }
}