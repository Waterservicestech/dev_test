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
  password: process.env.DB_PASSWORD || "1q2w3e",
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
  //endpoint de users
  const { firstName, lastName, email } = req.body;

  //verifica se os campos foram preenchidos
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  //cria um novo user
  const user = AppDataSource.manager.create(User, {
    firstName,
    lastName,
    email,
  });

  //salva o usuário no banco
  try {    
    const savedUser = await AppDataSource.manager.save(user);
    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ error: "Failed to save user" });
  }
});

app.post("/posts", async (req, res) => {
  //endpoint de posts
  const { title, description, userId } = req.body;

  //verifica se existe o usuário
  try {    
    const user = await AppDataSource.manager.findOne(User, {
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //cria uma novo Post
    const post = AppDataSource.manager.create(Post, {
      title,
      description,
      userId,
    });

    //salva o post no banco
    const savedPost = await AppDataSource.manager.save(post);
    res.status(201).json(savedPost);
  } catch (err) {
    console.error("Error saving post:", err);
    res.status(500).json({ error: "Failed to save post" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
