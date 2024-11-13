import { AppDataSource } from '../dataSource';
import { Post } from  '../entity/Post';


 export const postRepository = AppDataSource.getRepository(Post);