import { UserController } from '../controllers/user-controller';
import { UserRepository } from '../repositories/user-repository';
import { UserService } from '../services/user-service';

const makeUserController = (): UserController => {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  return new UserController(userService);
};

export default makeUserController;