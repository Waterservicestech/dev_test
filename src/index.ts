import 'reflect-metadata';
import express, { Response } from 'express';
import { DataSource } from 'typeorm';
import  User  from './entity/User';
import  Post  from './entity/Post';
import UserService from './service/UserService';
import CreateUserDto from './dto/CreateUserDto';
import CreatePostDto from './dto/CreatePostDto';
import PostService from './service/PostService';

const app = express();
app.use(express.json());


const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "db",
  port: 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "test_db",
  entities: [User,Post],
  synchronize: true,
});

const userService = new UserService(AppDataSource);
const postSevice = new PostService(AppDataSource);

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

app.post('/users', async (req, res): Promise<Response>  => {
  try {
    const data = req.body as CreateUserDto;
    const user = await userService.createUser(data);
    return res.status(201).json({ data: user })
  } catch (error) {
    return res.status(500).json({message: (error as Error).message})
  }
  
});

app.post('/posts', async (req, res) => {
  // Crie o endpoint de posts
  try {
    const data = req.body as CreatePostDto;
    const post = await postSevice.createPost(data)
    return res.status(201).json({ data: post });
  } catch (error) {
    return res.status(500).json({message: (error as Error).message})
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
