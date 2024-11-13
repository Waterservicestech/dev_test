import { IsNull } from 'typeorm';
import Post from '../domain/Post';
import PostRepository from '../repository/PostRepository';
import UserRepository from '../repository/UserRepository';
import { NotFoundUserByIdError} from '../errors/CustomizedErrors';

export default class UserService{

    private postRepository: PostRepository;
    private userRepository: UserRepository;

    constructor(){
        this.postRepository = new PostRepository();
        this.userRepository = new UserRepository();
    }

    savePost = async (post: Post) => {
        const userPost = await this.userRepository.findUserById(post.userId)
        
        if(userPost == null) {
            throw new NotFoundUserByIdError("Not found id", 404);
        }

        this.postRepository.save(post);
    }

}