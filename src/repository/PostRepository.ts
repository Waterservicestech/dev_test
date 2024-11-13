import { Repository} from 'typeorm';
import DomainPost  from '../domain/Post';
import { Post }from '../entity/Post';
import { AppDataSource } from '../AppDataSource';

export default class UserRepository{
    private repository: Repository<Post>;

    constructor() {
        this.repository = AppDataSource.getRepository(Post);
    }

    save = async (post: DomainPost) => {
        try{
            return this.repository.save(post);   
        }catch(err){
            console.error('Erro ao salvar usuário:', err);
            throw err; 
        }
    }
}