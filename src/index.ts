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

// Endpoint para criar um novo usuário
app.post('/users', async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const user = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;

  try {
    const savedUser = await AppDataSource.manager.save(user);
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário", error });
  }
});

// Endpoint para listar todos os usuários
app.get('/users', async (req, res) => {
  try {
    const users = await AppDataSource.manager.find(User);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar usuários", error });
  }
});

// Endpoint para criar um novo post
app.post('/posts', async (req, res) => {
  const { title, description, userId } = req.body;

  try {
    const user = await AppDataSource.manager.findOneBy(User, { id: userId });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const post = new Post();
    post.title = title;
    post.description = description;
    post.userId = user;

    const savedPost = await AppDataSource.manager.save(post);
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar post", error });
  }
});

// Endpoint para listar todos os posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await AppDataSource.manager.find(Post);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar posts", error });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
