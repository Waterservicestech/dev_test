import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Post } from './entity/Post';

const app = express();
app.use(express.json());

// TODO: is this configuration good?
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

// PERGUNTAR PELO EMAIL SE É PRA FAZER APENAS ESSES POST ENDPOINTS!

// Crie o endpoint de users
app.post("/users", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    // TESTAR ISSO AQUI!
    try {
      (await AppDataSource.getRepository(User).findOneBy({ email })) ||
        (res.status(400).json({ message: "Email already in use!" }) &&
          Promise.reject());
    } catch (error) {
      console.error("Error during email verification:", error);
      if (!res.headersSent) {
        return res
          .status(500)
          .json({ message: "Error verifying email uniqueness" });
      }
      return;
    }

    const user = AppDataSource.getRepository(User).create({
      firstName,
      lastName,
      email,
    });

    const savedUser = await AppDataSource.getRepository(User).save(user);
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user" });
  }
});

// Crie o endpoint de posts
app.post("/posts", async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    // Consolidar essa verificação:
    const user = await AppDataSource.getRepository(User).findOneBy({
      id: userId,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // consolidar essa porra toda:
    const post = AppDataSource.getRepository(Post).create({
      title,
      description,
      user,
    });
    const savedPost = await AppDataSource.getRepository(Post).save(post);
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Failed to create post" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
