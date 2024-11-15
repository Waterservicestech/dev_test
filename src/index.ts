import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Post } from './entity/Post';
import express, { Request, Response } from 'express';




const app = express();
app.use(express.json());

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "test_db",
  entities: [User, Post],
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

app.post('/users', async (req, res) => {
  console.log('Recebendo requisição para criar um usuário');
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create(req.body);
    const results = await userRepository.save(user);
    return res.send(results);
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.post('/posts', async (req, res) => {
  try {
    const postRepository = AppDataSource.getRepository(Post);
    const post = postRepository.create(req.body);
    const results = await postRepository.save(post);
    return res.send(results);
  } catch (err) {
    return res.status(500).send(err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
