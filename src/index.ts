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
  entities: [User, Post],
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

// Endpoint para criar usuários
app.post('/users', async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    // Validation
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ 
        error: 'First name, last name and email are required' 
      });
    }

    // Check if user already exists
    const existingUser = await AppDataSource.getRepository(User).findOne({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Create new user
    const user = AppDataSource.getRepository(User).create({
      firstName,
      lastName,
      email
    });

    // Save to database
    const result = await AppDataSource.getRepository(User).save(user);
    return res.status(201).json(result);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint para criar posts
app.post('/posts', async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    // Validação básica
    if (!title || !description || !userId) {
      return res.status(400).json({ 
        error: 'Título, descrição e userId são obrigatórios' 
      });
    }

    // Verifica se o usuário existe
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Cria novo post
    const post = AppDataSource.getRepository(Post).create({
      title,
      description,
      user
    });

    // Salva no banco de dados
    const result = await AppDataSource.getRepository(Post).save(post);
    return res.status(201).json(result);
  } catch (error) {
    console.error('Erro ao criar post:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/health', async (req, res) => {
  try {
    await AppDataSource.query('SELECT 1');
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    res.status(500).json({ status: 'error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});