import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Post } from './entity/Post';

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

app.post('/users', async (req, res) => {
  const dataSource = AppDataSource.getRepository(User);

  const {id} = await dataSource.save(req.body);

  res.status(201).json({id})
  
});

type IPost = {
  title: string;
  description: string;
  user:{
    id:number
  };
}

app.post('/posts', async (req, res) => {
  const dataSource = AppDataSource.getRepository(Post);

  const post:IPost ={
    title: req.body.title,
    description: req.body.description,
    user: {
      id: req.body.userId
    }
  } 

  const {id} = await dataSource.save(post);

  res.status(201).json({id})
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
