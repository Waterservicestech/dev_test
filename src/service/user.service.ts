import { userRepository } from '../repository/user.repository';
import { UserRequestDTO } from '../controller/dto/user-request.dto';
import { UserResponseDTO } from '../controller/dto/user-response.dto';

export class UserService {
  async createUser(data: UserRequestDTO): Promise<UserResponseDTO> {
    const user = userRepository().create(data);
    await userRepository().save(user);
    return user;
  }

  async getUsers(): Promise<UserResponseDTO[]> {
    return userRepository().find();
  }

  async getUserById(id: number): Promise<UserResponseDTO | null> {
    return userRepository().findOneBy({ id });
  }
}
