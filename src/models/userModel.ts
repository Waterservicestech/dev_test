import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { NewEntity } from "../interfaces";
import { IRepository } from "../interfaces/iRepository";
import IUser from "../interfaces/iUser";

export default class UserModel implements IRepository<IUser> {
    private model = AppDataSource.getRepository(User);

    async create(data: NewEntity<IUser>): Promise<IUser> {
        const user = new User();
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.email = data.email;

        await this.model.save(user);
        return user as IUser;
    }
}