import { User } from "../../entity/User";

export interface IUserRepository {
    createUser(user: User): Promise<User>;
}