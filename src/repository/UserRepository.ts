import { Repository} from 'typeorm';
import DomainUser  from '../domain/User';
import { User }from '../entity/User';
import { AppDataSource } from '../AppDataSource';

export default class UserRepository{
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    save = async (user: DomainUser) => {
        return this.repository.save(user);   
    }

    findUserById = async (id: number) => {
        return this.repository.findOneById(id);
    }
}