import { AppDataSource } from '../index';
import { User } from '../entity/User';

export const userRepository = () => {
  if (!AppDataSource.isInitialized) {
    throw new Error("Data Source has not been initialized");
  }
  return AppDataSource.getRepository(User);
};
