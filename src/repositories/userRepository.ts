import { AppDataSource } from '../config/database';
import { User } from '../entity/User';

export const userRepository = AppDataSource.getRepository(User);