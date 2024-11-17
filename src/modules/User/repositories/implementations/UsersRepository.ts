import { Repository } from "typeorm";

import { AppDataSource } from "../../../../database/data-source";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";
import { ICreateUserDTO } from "../../dto/ICreateUserDTO";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;
    private static INSTANCE: UsersRepository;

    private constructor() {
      this.repository = AppDataSource.getRepository(User);
    }

    static getInstance() {
      if (!this.INSTANCE) {
        this.INSTANCE = new UsersRepository()
      }

      return this.INSTANCE;
    }

    teste() {
      return 'deu certo'
    }

    async create({ firstName, lastName, email }: ICreateUserDTO): Promise<User> {
      const userEntityInstance = this.repository.create({ firstName, lastName, email })

      const user = await this.repository.save(userEntityInstance)

      return user;
    }

    async findById(userId: number): Promise<User | null> {
      const user = await this.repository.findOneBy({ id: userId })

      return user;
    }

    async findByEmail(email: string): Promise<User | null> {
      const user = await this.repository.findOneBy({ email })

      return user;
    }
}

export { UsersRepository }