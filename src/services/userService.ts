import { AppDataSource } from '../config/database';
import { User } from '../entity/User';
import { httpLogger } from '../middlewares/logger';

class UserService {
  private userRepository = AppDataSource.getRepository(User);

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public async createUser(firstName: string, lastName: string, email: string): Promise<User> {
    if (!firstName || !lastName || !email) {
      httpLogger.error('Missing required fields', { firstName, lastName, email });
      throw new Error('Invalid data');
    }

    if (!this.isValidEmail(email)) {
      httpLogger.error('Invalid email format', { email });
      throw new Error('Invalid email format');
    }

    const isEmailAlreadyInUse = await this.userRepository.findOneBy({ email });

    if (isEmailAlreadyInUse) {
      httpLogger.error('Email already in use', { email });
      throw new Error('Email already in use');
    }

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    try {
      await this.userRepository.save(user);
      httpLogger.info('User created successfully', { user });
      return user;
    } catch (error) {
      if (error instanceof Error) {
        httpLogger.error(error.message, { email });
      } else {
        httpLogger.error('An unknown error occurred', { email });
      }
      throw error instanceof Error
        ? error
        : new Error('An unknown error occurred');
    }
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      httpLogger.error('User not found', { email });
    }
    return user;
  }

  public async updateUser(email: string, newEmail: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      httpLogger.error('User not found', { email });
      throw new Error('User not found');
    }

    if (!this.isValidEmail(newEmail)) {
      httpLogger.error('Invalid email format', { newEmail });
      throw new Error('Invalid email format');
    }

    user.email = newEmail;
    await this.userRepository.save(user);

    httpLogger.info('User updated successfully', { user });
    return user;
  }

  public async deleteUser(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      httpLogger.error('User not found', { email });
      throw new Error('User not found');
    }

    await this.userRepository.remove(user);
    httpLogger.info('User deleted successfully', { email });
  }
}

export default new UserService();