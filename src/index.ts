import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import { User, userData } from "./entity/User";
import { Post, postData } from "./entity/Post";

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

  // Adicionei o seguinte para consistencia durante testes, pois com a verificação do email de usuário o teste falha quando roda uma segunda vez, e prefiro ter um endpoint mais robusto!
  dropSchema: true,
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
// Crie o endpoint de users
app.post("/users", async (req, res) => {
  const { firstName, lastName, email }: userData = req.body;
  if (!firstName || !lastName || !email) {
    return res.status(400).json({
      message: "Must contain firstName, lastName and email.",
    });
  }
  if (firstName.length > 100 || lastName.length > 100 || email.length > 100) {
    return res.status(400).json({
      message: "Fields must be up to 100 characters.",
    });
  }

  try {
    const user = await AppDataSource.getRepository(User)
      .findOneBy({ email })
      .then((existingUser) =>
        existingUser
          ? Promise.reject({ status: 400, message: "Email already in use!" })
          : AppDataSource.getRepository(User).save(
              AppDataSource.getRepository(User).create({
                firstName,
                lastName,
                email,
              })
            )
      );

    res.status(201).json(user);
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Failed to create user";
    res.status(status).json({ message });
  }
});

// Crie o endpoint de posts
app.post("/posts", async (req, res) => {
  const { title, description, userId }: postData = req.body;
  if (!title || !description || !userId) {
    return res.status(400).json({
      message: "Must contain title, description and userId.",
    });
  }
  if (title.length > 100 || description.length > 100) {
    return res.status(400).json({
      message: "Title and description must up to 100 characters.",
    });
  }

  try {
    const post = await AppDataSource.getRepository(User)
      .findOneBy({ id: userId })
      .then((user) =>
        user
          ? AppDataSource.getRepository(Post).save(
              AppDataSource.getRepository(Post).create({
                title,
                description,
                user,
              })
            )
          : Promise.reject({ status: 404, message: "User not found" })
      );

    res.status(201).json(post);
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Failed to create post";
    res.status(status).json({ message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
