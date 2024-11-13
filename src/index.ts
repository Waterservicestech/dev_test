import 'express-async-errors';
import 'reflect-metadata';
import express from 'express';
import UserController from './controller/UserController';
import PostController from './controller/PostController';
import { AppDataSource } from './AppDataSource';
import { managerErrors } from './middlewares/ManagerErrors';

const app = express();
app.use(express.json());

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

const userController = new UserController();
const postController = new PostController()

app.post('/users', userController.saveUser);
app.post('/posts', postController.savePost);

app.use(managerErrors);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
