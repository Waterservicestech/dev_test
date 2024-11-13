import { AppDataSource } from '../dataSource';
import { User } from  '../entity/User';


 export const userRepository = AppDataSource.getRepository(User);