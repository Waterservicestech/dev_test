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
  const { firstName, lastName, email } = req.body;
  try {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    await AppDataSource.manager.save(user);
    res.status(201).json(user);
  } catch (error) {
    console.error({ message: "Erro ao criar usuário" });
    res.status(500).json({ message: "Erro ao criar usuário" });
  }
});

app.post('/posts', async (req, res) => {
  const { title, description, userId } = req.body;

  if (!title) { return res.status(400).json({ message: "O campo 'titulo' é obrigatório" });}

  try {
    const user = await AppDataSource.manager.findOne(User, { where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const post = new Post();
    post.title = title;
    post.description = description;
    post.user = user;

    await AppDataSource.manager.save(post);
    res.status(201).json(post);
  } catch (error) {
    console.error("Erro ao criar o post", error);
    res.status(500).json({ message: "Erro ao criar post" })
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});