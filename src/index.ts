import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import { container } from './container';
import { UserUseCase } from '@user/UserUseCase';
import { User } from '@entity/User';
import { Post } from '@entity/Post';
import { PostUseCase } from '@post/PostUseCase';

const app = express();
app.use(express.json());

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "test_db",
  entities: [User,Post],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development' ? true : false,
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

app.post('/users', async (req, res) => {
  const {email, firstName, lastName} = req.body;

  const useCase = container.get(UserUseCase);

  const response = await useCase.create({email, firstName, lastName});

  return res.status(201).json(response);

});

app.post('/posts', async (req, res) => {
  const { title , description, userId } = req.body;

  const useCase = container.get(PostUseCase);

  const response = await useCase.create({title, description, userId});

  return res.sendStatus(201).json(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
