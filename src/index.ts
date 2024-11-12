import "reflect-metadata";
import express from "express";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Post } from "./entity/Post";
import { UserController } from "./controller/user.controller";
import { PostController } from "./controller/post.controller";

const app = express();
app.use(express.json());

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "test_db",
  entities: [User, Post],
  synchronize: true,
});

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const initializeDatabase = async () => {
  await wait(20000);
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
    process.exit(1);
  }
};

initializeDatabase();

const userController = new UserController();
const postController = new PostController();

app.post("/users", userController.createUser.bind(userController));
app.get("/users", userController.getUsers.bind(userController));
app.get("/users/:id", userController.getUserById.bind(userController));

app.post("/posts", postController.createPost.bind(postController));
app.get("/posts", postController.getPosts.bind(postController));
app.get("/posts/:id", postController.getPostById.bind(postController));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
