import User from "../entities/User";
import IUser from "../interfaces/IUser";
import { AppDataSource } from "../database";

const userRepository = AppDataSource.getRepository(User);

const getUsers = (): Promise<IUser[]> => {
    return userRepository.find();
}

const createUser = (userData: IUser): Promise<any> => {
    const newUser = userRepository.create(userData);
    return userRepository.save(newUser);
}

export default { getUsers, createUser };