import { User } from "../../entity/User";

export interface IUserRepository {
    createUser(user: User): Promise<User>;
    findUserById(id: number): Promise<User | null>;
}