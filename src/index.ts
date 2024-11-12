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
  const {firstName, lastName, email} = req.body;

  if(!firstName || !lastName || !email) {
    return res.status(400).json({message: "Todos os campos são obrigatórios."})
  }

  const user = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  
  try {
      const userRepository = AppDataSource.getRepository(User);
      const savedUser = await userRepository.save(user);

      return res.status(201).json(savedUser);
  } catch(error) {
    console.error("Erro ao salvar o usuário: ", error);
    return res.status(500).json({ message: "Erro ao salvar o usuário." });
  }


});

app.post('/posts', async (req, res) => {
  const { title, description, userId } = req.body;

  if(!title || !description || !userId) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." })
  }

  const post = new Post();

  post.title = title;
  post.description = description;

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }
  
  post.user = user;

  try {
    const postRepository = AppDataSource.getRepository(Post);
    const savedPost = await postRepository.save(post);

    return res.status(201).json(savedPost);
  } catch(error) {
    console.error("Erro ao salvar o post:", error);
    return res.status(500).json({ message: "Erro ao salvar o post." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
