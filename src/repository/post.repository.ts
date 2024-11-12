import { AppDataSource } from '../index';
import { Post } from '../entity/Post';

/**
 * Retorna o repositório de posts.
 * Retorna um erro se o Data Source não estiver inicializado.
 * Retorna o repositório de posts.
 */
export const postRepository = () => {
  if (!AppDataSource.isInitialized) {
    throw new Error("Data Source has not been initialized");
  }
  return AppDataSource.getRepository(Post);
};