import "reflect-metadata";
import express from "express";
import { initializeDatabase, AppDataSource } from "./config/database";
import { User } from "./entity/User";
import { Post } from "./entity/Post";

const app = express();
app.use(express.json());

initializeDatabase();

app.post("/users", async (req, res) => {
  // Crie o endpoint de users
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create(req.body);
    await userRepository.save(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar usuário", error });
  }
});

app.post("/posts", async (req, res) => {
  // Crie o endpoint de posts
  try {
    const postRepository = AppDataSource.getRepository(Post);
    const post = postRepository.create(req.body);
    await postRepository.save(post);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar post", error });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
