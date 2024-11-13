import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Post } from './entity/Post';
import { UserRepository } from './repository/user.repository';
import { PostRepository } from './repository/post.repository';
import { CreateUserUseCase } from './use-cases/create-user/create-user.use-case';
import { CreatePostUseCase } from './use-cases/create-post/create-post.use-case';
import { UserController } from './use-cases/create-user/create-user.controller';
import { PostController } from './use-cases/create-post/create-post.controller';

const app = express();
app.use(express.json());

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "test_db",
  entities: [User,Post],
  synchronize: true,
});

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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

const userRepository = new UserRepository(AppDataSource.getRepository("User")); 
const createUserUseCase = new CreateUserUseCase(userRepository);
const userController = new UserController(createUserUseCase);

app.post('/users', async (req, res) => {
  return userController.addUser(req, res);
});

const postRepository = new PostRepository(AppDataSource.getRepository("Post"));
const createPostUseCase = new CreatePostUseCase(postRepository);
const postController = new PostController(createPostUseCase);

app.post('/posts', async (req, res) => {
  return postController.addPost(req, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
