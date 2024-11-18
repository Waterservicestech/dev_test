import AppDataSource from '../data-source';
import { User } from '../entity/User';

export class UserRepository {
  private repo = AppDataSource.getRepository(User);

  async create(data: Partial<User>): Promise<User> {
    const createdUser = this.repo.create(data)
    return this.repo.save(createdUser);
  }

  async get(id: number): Promise<User | null> {
    const user = this.repo.findOne({ where: { id } });
    return user;
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = this.repo.findOne({ where: { email } });
    return user;
  }
}