import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Post } from './entity/Post';
import asyncHandler from "express-async-handler"
import { errorHandler } from './middleware/errorMiddleware';

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
  await wait(1000);
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
    process.exit(1);
  }
};

initializeDatabase();

app.post('/users', asyncHandler(async (req, res) => {
// Crie o endpoint de users
  const { firstName, lastName, email } = req.body;
  
  if (!firstName || !lastName || !email) {
    res.status(400);
    throw new Error("Incorrect fields");
  }
  
  // Criação de instância do usuário
  const user = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;

  // Salvando usuário no banco de dados
  res.status(500)
  const savedUser = await AppDataSource.getRepository(User).save(user);

  // Resposta de sucesso
  if (savedUser){

    res.status(201).json({
      id: savedUser.id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
    });

  } else {

    res.status(400)
    throw new Error('invalid project data')
  }  

}));

app.post('/posts', asyncHandler(async (req, res) => {
  const { title, description, userId } = req.body;

  if (!title || !description || !userId) {
    res.status(400);
    throw new Error("Incorrect fields");
  }

  res.status(500)
  const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const post = new Post();
  post.title = title;
  post.description = description;
  post.user = user;

  const savedPost = await AppDataSource.getRepository(Post).save(post);

  res.status(201).json({
    id: savedPost.id,
    title: savedPost.title,
    description: savedPost.description,
    userId: savedPost.user.id,
  });
}));


app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
