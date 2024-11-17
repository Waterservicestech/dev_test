import { User } from "../entity/User";
import database from "../infra/db";

export class UserService {
  private userRepository = database.AppDataSource.getRepository(User)

  async createUser(firstName: string, lastName: string, email: string) : Promise<User> {
      const user = this.userRepository.create({ firstName, lastName, email})

      return await this.userRepository.save(user);
  }
}