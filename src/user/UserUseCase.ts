import { User } from "@entity/User";
import { CreateUserDTO } from "./CreateUserDTO";
import { Repository } from "typeorm";
import { injectable } from "inversify";
import { AppDataSource } from "index";

@injectable()
export class UserUseCase {
  private readonly repository : Repository<User>;

  constructor() {
    this.repository  = AppDataSource.getRepository(User);
  }

  async create({email, firstName, lastName} : CreateUserDTO) : Promise<User> {
    const user = new User(firstName, lastName, email);

    return await this.repository.save(user);
  } 
}