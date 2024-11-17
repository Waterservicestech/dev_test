import { Router } from "express";
import { Request, Response } from "express"
import { UserController } from "../controllers/UserController";
import { validateFields } from "../middlewares/validationMiddleware";
import { userSchemaValidation } from "../schemas/userSchema";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", 
  validateFields(userSchemaValidation), (req: Request, res: Response) => 
  userController.createUser(req, res)
)

export default userRoutes;