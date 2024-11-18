import express from 'express';
import 'reflect-metadata';
import AppDataSource from './data-source';
import makeUserController from './factories/user-factory';
import makePostController from './factories/post-factory';

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

const userController = makeUserController()
const postController = makePostController();

app.post('/users', async (req, res) => userController.store(req, res));

app.post('/posts', async (req, res) => postController.store(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
