import { AppDataSource } from '../index';
import { User } from '../entity/User';

/**
 * Retorna o repositório de usuários.
 * Retorna um erro se o Data Source não estiver inicializado.
 * Retorna o repositório de usuários.
 */
export const userRepository = () => {
  if (!AppDataSource.isInitialized) {
    throw new Error("Data Source has not been initialized");
  }
  return AppDataSource.getRepository(User);
};
