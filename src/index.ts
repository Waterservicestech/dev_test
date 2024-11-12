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

initializeDatabase().then(() => {

  app.post('/users', async (req, res) => {
  // Crie o endpoint de users
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create(req.body);
    const result = await userRepository.save(user);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
  });

  app.post('/posts', async (req, res) => {
  // Crie o endpoint de posts
  try {
    const postRepository = AppDataSource.getRepository(Post);
    const userRepository = AppDataSource.getRepository(User);

    // Check if the user exists
    const user = await userRepository.findOneBy({ id: req.body.userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create and save the post
    const post = postRepository.create({
      title: req.body.title,
      description: req.body.description,
      userId: req.body.userId,
    });

    const result = await postRepository.save(post);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

});