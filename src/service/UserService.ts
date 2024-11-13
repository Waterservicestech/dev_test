import User from '../domain/User';
import UserRepository from '../repository/UserRepository';

export default class UserService{

    private repository : UserRepository;

    constructor(){
        this.repository = new UserRepository();
    }

    saveUser = async (user: User) => {
        await this.repository.save(user);
    }

}