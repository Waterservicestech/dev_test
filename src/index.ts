import "reflect-metadata";
import express from "express";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Post } from "./entity/Post";
import { AppDataSource } from "./config/dbconfig";

const app = express();
app.use(express.json());

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

// Endpoint para gerenciar usuários
app.get("/users", async (_, res) => {
    const users = await AppDataSource.getRepository(User).find({ relations: ["posts"] });
    res.json(users);
});

app.post("/users", async (req, res) => {
    const user = await AppDataSource.getRepository(User).save(req.body);
    res.status(201).json(user);
});

// Endpoint para gerenciar posts
app.get("/posts", async (_, res) => {
    const posts = await AppDataSource.getRepository(Post).find({ relations: ["user"] });
    res.json(posts);
});

app.post("/posts", async (req, res) => {
    const post = await AppDataSource.getRepository(Post).save(req.body);
    res.status(201).json(post);
});

// Conectar ao banco e iniciar o servidor
AppDataSource.initialize().then(() => {
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
});
