import { Repository } from "typeorm";
import { User } from "../entity/User";
import { Result } from "../utils/types";

export type CreateUserDTO = {
  firstName: string;
  lastName: string;
  email: string;
};

export type UserConstructorProps = {
  userRepository: Repository<User>;
};
export class UserService {
  private userRepository: Repository<User>;
  constructor({ userRepository }: UserConstructorProps) {
    this.userRepository = userRepository;
  }

  async create({
    firstName,
    lastName,
    email,
  }: CreateUserDTO): Promise<Result<User>> {
    try {
      const userWithEmail = await this.userRepository.findOneBy({
        email,
      });

      if (userWithEmail) {
        return {
          success: false,
          error: {
            message: "Email already registered, should be unique.",
            code: "EMAIL_ALREADY_REGISTERED",
          },
        };
      }

      const user = new User();

      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;

      const savedUser = await this.userRepository.save(user);
      return {
        success: true,
        data: savedUser,
      };
    } catch (error) {
      console.error("Error creating user:", error);
      return {
        success: false,
        error: {
          message: "Internal server error",
          code: "SERVER_ERROR",
        },
      };
    }
  }
}
