import { NewEntity } from "../interfaces";
import { IRepository } from "../interfaces/iRepository";
import IUser from "../interfaces/iUser";
import { ServiceResponse } from "../interfaces/serviceResponse";
import UserModel from "../models/userModel";

export default class UserService {
    constructor(
        private userModel: IRepository<IUser> = new UserModel(),
    ) { }

    public async createUser(user: NewEntity<IUser>): Promise<ServiceResponse<IUser>> {
        const newUser = await this.userModel.create(user);
        return { status: 'CREATED', data: newUser };
    }
}