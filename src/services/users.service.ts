import { AppDataSource } from "..";
import { User } from "../entity/User";

export class UserService {
  private userRespository = AppDataSource.getRepository(User);

  async createUser(firstName: string, lastName: string, email: string): Promise<User> {
    const newUser = this.userRespository.create({ firstName, lastName, email });

    return await this.userRespository.save(newUser);
  }

  async getUserById(userId: number): Promise<User | null> {
    return await this.userRespository.findOne({ where: { id: userId } });
  }
}