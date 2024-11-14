import { CreateUserDto, OutputUserDto } from "./create-user.dto";
import { User } from "../../entity/User";
import { IUserRepository } from "../../repository/interface/user.interface.repository";

export class CreateUserUseCase {
    
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(createUserDto: CreateUserDto): Promise<OutputUserDto | unknown> {
        try {
            const newUser = new User(
                createUserDto.firstName,
                createUserDto.lastName,
                createUserDto.email,
            );

            const result = await this.userRepository.createUser(newUser); 
            return {
                id: result.id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
            };

        } catch(err) {
            return err; 
        }
    }
}