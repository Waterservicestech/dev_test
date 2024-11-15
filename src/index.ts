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
// Crie o endpoint de users
    const {firstName, lastName, email} = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({error: "Nome, sobrenome e email são obrigatórios"});
    }

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    try{
      await AppDataSource.getRepository(User).save(user);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({message: "Erro ao criar o usuário", error});
    }
});

app.post('/posts', async (req, res) => {
// Crie o endpoint de posts
    const {title, description, userId} = req.body;

    if (!title || !description || !userId) {
      return res.status(400).json({error: "Título, descrição e userId são obrigatórios"});
    }
    //O usuário existe?
    const user = await AppDataSource.manager.findOne(User, { where: { id: userId } });

    if (!user) {
      return res.status(404).json({error: "Usuário não encontrado"});
    }

    const post = new Post();
    post.title = title;
    post.description = description;
    post.user = user;

    try{
      await AppDataSource.getRepository(Post).save(post);
      return res.status(201).json(post);
    } catch (error) {
      return res.status(500).json({message: "Erro ao criar o post", error});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
