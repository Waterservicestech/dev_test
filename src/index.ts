import "reflect-metadata";
import express from "express";
import { userRegistrationSchema } from "./schemas/userSchemas";
import { validateData } from "./middleware/validationMiddleware";
import { postRegistrationSchema } from "./schemas/postSchema";
import { initializeDatabase } from "./config/database";
import { UserController } from "./controllers/userController";
import { PostController } from "./controllers/postController";
import { envServerSchema } from "./utils/env";

const { API_PORT } = envServerSchema;

const app = express();
app.use(express.json());

initializeDatabase();

const userController = new UserController();
const postController = new PostController();

// /users
app.post(
  "/users",
  validateData(userRegistrationSchema),
  userController.create.bind(userController),
);

// /posts
app.post(
  "/posts",
  validateData(postRegistrationSchema),
  postController.create.bind(postController),
);

const PORT = Number(API_PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
