import "reflect-metadata";
import express from "express";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Post } from "./entity/Post";

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

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

app.post("/users", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        error: "firstName, lastName and email are required",
      });
    }

    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        error: `User with this email ${email} already exists`,
      });
    }

    const user = userRepository.create({
      firstName,
      lastName,
      email,
    });

    await userRepository.save(user);

    return res.status(201).json(user);
  } catch (err) {
    console.error("Error creating user: ", err);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    if (!title || !description || !userId) {
      return res.status(400).json({
        error: "title, description and userId are required",
      });
    }

    const userRepository = AppDataSource.getRepository(User);
    const postRepository = AppDataSource.getRepository(Post);

    const user = await userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        error: `User with userId ${userId} was not found`,
      });
    }

    const post = postRepository.create({
      title,
      description,
      user,
    });

    await postRepository.save(post);

    return res.status(201).json(post);
  } catch (err) {
    console.error("Error creating post: ", err);

    res.status(500).json({
      error: "Internal server error",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
