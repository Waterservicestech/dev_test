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
// Crie o endpoint de users
try {
    // Extrai os dados do corpo da requisição
    const { firstName, lastName, email } = req.body;   

    let DB: User[] = [];    

    // Cria uma nova instância de User
    const newUser = new User();  
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;

    DB.push(newUser);   

    // Retorna o usuário criado no corpo da resposta
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});

app.post('/posts', async (req, res) => {
// Crie o endpoint de posts

try {
  // Extrai os dados do corpo da requisição
  const { title, description, userId } = req.body; 

  let DB: Post[] = [];

  // Cria uma nova instância de User
  const newPost = new Post();  
  newPost.title = title;
  newPost.description = description;
  newPost.userId = userId;

  DB.push(newPost);  

  // Retorna o usuário criado no corpo da resposta
  res.status(201).json(newPost);
} catch (error) {
  console.error("Erro ao criar post:", error);
  res.status(500).json({ message: "Erro interno do servidor." });
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
