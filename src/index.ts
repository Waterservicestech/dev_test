import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Post } from './entity/Post';
import { error } from 'console';

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
const { firstName, lastName, email } = req.body;

if(!firstName || !lastName || !email) {
  return res.status(400).json({ error: "Todos os campos são obrigatórios" });
}
try {
  const userRepository = AppDataSource.getRepository(User);

  const existingUser = await userRepository.findOneBy({ email });
  if (existingUser){
    return res.status(409).json({ error: "Email já esta em uso."});
  }
  const user = userRepository.create({ firstName, lastName, email });
  const savedUser = await userRepository.save(user);
  res.status(201).json(savedUser);
} catch (error) {
  console.error("Error ao criar usuario:", error);
  res.status(500).json({ error: "Erro interno do servidor" });
}
});

app.post('/posts', async (req, res) => {
// Crie o endpoint de posts
const { title, description, userId } = req.body;
try {
  const userRepository = AppDataSource.getRepository(User);
  const postRepository = AppDataSource.getRepository(Post);

  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    return res.status(404).json({ message: 'Usuario não encontrado.'});
  }
  const post = postRepository.create({ title, description, user });
  await postRepository.save(post);
  res.status(201).json(post);
} catch (error) {
  console.error("Erro ao criar post: ", error);
  res.status(500).json({ message: "erro ao criar post"});
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
