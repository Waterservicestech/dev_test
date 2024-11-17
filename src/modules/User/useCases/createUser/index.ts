import { CreateUserController } from "./CreateUser.controller"
import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { CreateUserService } from "./CreateUser.service";

const usersRepository = UsersRepository.getInstance();
const createUserService = new CreateUserService(usersRepository)
const createUserController = new CreateUserController(createUserService);

export { createUserController }