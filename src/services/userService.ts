import { User } from '../entity/User';
import { AppDataSource } from '../database';

export class UserService {
    async createUser(userData: Partial<User>): Promise<User> {
        const userRepository = AppDataSource.getRepository(User);
        const user = userRepository.create(userData);
        return await userRepository.save(user);
    }

    async getAllUsers(): Promise<User[]> {
        const userRepository = AppDataSource.getRepository(User);
        return await userRepository.find();
    }
}
