import { DataSource, Repository } from "typeorm";
import User from "../entity/User";
import CreateUserDto from "../dto/CreateUserDto";

class UserService {
  private userRepository: Repository<User>;

  constructor(dataSouce: DataSource) {
    this.userRepository = dataSouce.getRepository(User)
  }

  async createUser({ firstName, lastName, email }: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({firstName, lastName, email})
    return this.userRepository.save(user)
  }

  async findUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}

export default UserService;