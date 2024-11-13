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

initializeDatabase();

app.post('/users', async (req, res) => {
  try {
    const user = new User()
     user.firstName = req.body.firstName
     user.lastName = req.body.lastName
     user.email = req.body.email

    if (!user.firstName || !user.lastName || !user.email) {
      return res.status(400).json({ message: "Algum dos valores está incorreto ou não está preenchido." });
    }
    
    const userData = await AppDataSource.manager.save(user)

    return res.status(201).json({message: `Usuário criado com sucesso!`, id: userData.id, firstName: userData.firstName, lastName: userData.lastName, email: userData.email})
  } catch (error) {
    console.error("Error:", error)
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
});

app.post('/posts', async (req, res) => {
 try {
  const post = new Post();
  post.title = req.body.title
  post.description = req.body.description
  post.user = req.body.userId
  
  if (!post.title || !post.description || !post.user) {
    return res.status(400).json({ message: "Algum dos valores está incorreto ou não está preenchido." });
  }
  
  const postData = await AppDataSource.manager.save(post)

  return res.status(201).json({message: `Post criado com sucesso!`, id: postData.id, title: postData.title, description: postData.description, userId: postData.user})
 } catch (error) {
  console.error("Error:", error)
  return res.status(500).json({ message: "Erro interno do servidor." });
 }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
