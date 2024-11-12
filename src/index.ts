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

AppDataSource.initialize()
  .then(() => console.log("Data Source initialized successfully"))
  .catch((error) => console.error("Data Source initialization error:", error));

app.post('/users', async (req, res) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create(req.body);
    await userRepository.save(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.post('/posts', async (req, res) => {
  try {
    const postRepository = AppDataSource.getRepository(Post);
    const post = postRepository.create(req.body);
    await postRepository.save(post);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
