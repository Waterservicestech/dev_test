import { AppDataSource } from '../index';
import { Post } from '../entity/Post';

export const postRepository = () => {
  if (!AppDataSource.isInitialized) {
    throw new Error("Data Source has not been initialized");
  }
  return AppDataSource.getRepository(Post);
};
