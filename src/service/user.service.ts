import { userRepository } from '../repository/user.repository';
import { UserRequestDTO } from '../controller/dto/user-request.dto';
import { UserResponseDTO } from '../controller/dto/user-response.dto';

export class UserService {
  /**
   * Cria um novo usuário com os dados fornecidos.
   * Verifica se o email já está em uso antes de criar o usuário.
   */
  async createUser(data: UserRequestDTO): Promise<UserResponseDTO> {
    const existingUser = await userRepository().findOneBy({ email: data.email });
    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    const user = userRepository().create(data);
    await userRepository().save(user);
    return user;
  }

  // Retorna uma lista de todos os usuários.
  async getUsers(): Promise<UserResponseDTO[]> {
    return userRepository().find();
  }

  // Retorna um usuário por ID.
  async getUserById(id: number): Promise<UserResponseDTO> {
    const user = await userRepository().findOneBy({ id });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }
}
