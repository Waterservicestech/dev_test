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

  const { firstName, lastName, email } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = new User();

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    await userRepository.save(user);

    res.status(201).json(user);
  } catch (error) {
    console.error('Erro ao criar usuário: ', error);
    return res.status(500).json({ message: 'Erro ao criar usuário: ', error });
  }
});

app.post('/posts', async (req, res) => {
  
  const { title, description, userId } = req.body;
  const userRepository = AppDataSource.getRepository(User);
  const postRepository = AppDataSource.getRepository(Post);

  try {
    if (userId === null) {
      return res.status(422).json({ message: 'O id do usuário não pode ser nulo' })
    }
    const user = await userRepository.findOneBy({ id: userId });
    const post = new Post();


    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' })
    } else {
      post.title = title;
      post.description = description;
      post.user = user;

      await postRepository.save(post);
      return res.status(201).json(post);
    }

  } catch (error) {
    console.error('Erro ao tentar criar o post: ', error);
    return res.status(500).json({ message: 'Erro ao tentar criar o post: ', error});
  }

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
