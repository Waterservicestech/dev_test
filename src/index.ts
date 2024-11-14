import "reflect-metadata";
import express from "express";
import { DataSource } from "typeorm";
import User from "./entity/User";
import Post from "./entity/Post";

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

// User creation endpoint

app.post("/users", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  console.log("Received user data:", { firstName, lastName, email });

  try {
    const user = new User();
    user.setFirstName(firstName);
    user.setLastName(lastName);
    user.setEmail(email);

    const userRepository = AppDataSource.getRepository(User);
    const newUser = await userRepository.save(user);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Could not create user" });
  }
});

// Post creation endpoint

app.post("/posts", async (req, res) => {
  const { title, description, userId } = req.body;
  try {
    const post = new Post();
    post.setTitle(title);
    post.setDescription(description);
    post.setUserId(userId);

    const postRepository = AppDataSource.getRepository(Post);
    const newPost = await postRepository.save(post);
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Could not create post" });
  }
});

app.get("/", (req, res) => {
  res.send("Running steady.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
