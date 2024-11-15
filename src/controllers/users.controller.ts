import { UserService } from "../services/users.service";



export class UserController {
  private UserService = new UserService();

  async createUser(req: any, res: any) {
    const { firstName, lastName, email } = req.body;
    try {
      const savedUser = await this.UserService.createUser(firstName, lastName, email);
      res.status(201).json(savedUser);
    } catch (err) {
      console.error("Error creating user", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}