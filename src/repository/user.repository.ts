import { Repository } from "typeorm";
import { User } from "../entity/User";
import { IUserRepository } from "./interface/user.interface.repository";

export class UserRepository implements IUserRepository{
    
    private userRepository: Repository<User>;

    constructor(repository: Repository<User>){
        this.userRepository = repository;
    }
    
    async createUser(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async findUserById(id: number): Promise<User | null>{
        return await this.userRepository.findOneBy({ id: id });
    }
}