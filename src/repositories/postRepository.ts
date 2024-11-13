import { AppDataSource } from '../config/database';
import { Post } from '../entity/Post';

export const postRepository = AppDataSource.getRepository(Post);