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

app.post('/users', async (req, res) => {
  // Crie o endpoint de users
  try {
    const { firstName, lastName, email } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    const emailExisting = await userRepository.findOne({ where: { email } });
    if (emailExisting) {
      return res.status(400).json({ message: "Usuário já cadastrado!" })
    }

    const newUser = userRepository.create({
      firstName,
      lastName,
      email,
    })

    await userRepository.save(newUser);

    res.status(201).json(newUser);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro interno no servidor." })
  }
});

app.post('/posts', async (req, res) => {
  // Crie o endpoint de posts
  try {
    const { title, description, userId } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const postRepository = AppDataSource.getRepository(Post);

    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    const newPost = postRepository.create({
      title,
      description,
      user
    });

    await postRepository.save(newPost);

    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
