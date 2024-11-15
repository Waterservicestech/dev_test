import { Post } from '../entity/Post';
import { User } from '../entity/User';
import { AppDataSource } from '../database';

export class PostService {
    async createPost(postData: { title: string, description: string, userId: number}): Promise<Post> {
        const postRepository = AppDataSource.getRepository(Post);
        const userRepository = AppDataSource.getRepository(User);
        
        const user = await userRepository.findOneBy({ id: postData.userId });
        if (!user) {
            throw new Error('User not found');
        }

        const post = postRepository.create({ ...postData, user });
        return await postRepository.save(post);
    }

    async getAllPosts(): Promise<Post[]> {
        const postRepository = AppDataSource.getRepository(Post);
        console.log('ueun');
        
        return await postRepository.find({ relations: ['user'] });
    }
}
