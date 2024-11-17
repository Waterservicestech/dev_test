import { Router } from "express";
import { Request, Response } from "express"
import { PostController } from "../controllers/PostController";
import { validateFields } from "../middlewares/validationMiddleware";
import { postSchemaValidation } from "../schemas/postSchema";

const postRoutes = Router()
const postController = new PostController();

postRoutes.post("/", 
  validateFields(postSchemaValidation), (req: Request, res: Response) => 
  postController.createPost(req, res)
)

export default postRoutes;