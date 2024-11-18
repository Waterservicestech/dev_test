import { UserDTO } from '../dtos/user-dto';
import { UserResponseDTO } from '../dtos/user-response-dto';
import { UserRepository } from '../repositories/user-repository';
import { BadRequestError } from '../utils/errors/bad-request-error';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: UserDTO) {
    const existingUser = await this.userRepository.getByEmail(user.email);
    if (existingUser) throw new BadRequestError('This email is already in use.');

    const createdUser = await this.userRepository.create(user);
    return new UserResponseDTO(createdUser);
  }
}