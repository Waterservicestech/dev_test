import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Post } from './entity/Post';

const app = express();
app.use(express.json());

// Configuração do DataSource
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

// Função para inicializar o banco de dados após um tempo de espera
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

// Endpoints CRUD para User

// GET - Listar todos os usuários
app.get('/users', async (_req: Request, res: Response) => {
  const users = await AppDataSource.manager.find(User);
  res.json(users);
});

// GET - Obter um usuário por ID
app.get('/users/:id', async (req: Request, res: Response) => {
  const user = await AppDataSource.manager.findOne(User, { where: { id: parseInt(req.params.id) } });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// POST - Criar um novo usuário
app.post('/users', async (req: Request, res: Response) => {
  const { firstName, lastName, email } = req.body;
  const user = AppDataSource.manager.create(User, { firstName, lastName, email });
  await AppDataSource.manager.save(user);
  res.status(201).json(user);
});

// PUT - Atualizar um usuário existente
app.put('/users/:id', async (req: Request, res: Response) => {
  const { firstName, lastName, email } = req.body;
  const user = await AppDataSource.manager.findOne(User, { where: { id: parseInt(req.params.id) } });
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.email = email || user.email;
  await AppDataSource.manager.save(user);

  res.json(user);
});

// DELETE - Deletar um usuário
app.delete('/users/:id', async (req: Request, res: Response) => {
  const user = await AppDataSource.manager.findOne(User, { where: { id: parseInt(req.params.id) } });
  if (!user) return res.status(404).json({ message: 'User not found' });

  await AppDataSource.manager.remove(user);
  res.json({ message: 'User deleted' });
});

// Endpoints CRUD para Post

// GET - Listar todas as postagens
app.get('/posts', async (_req: Request, res: Response) => {
  const posts = await AppDataSource.manager.find(Post, { relations: ['user'] });
  res.json(posts);
});

// GET - Obter uma postagem por ID
app.get('/posts/:id', async (req: Request, res: Response) => {
  const post = await AppDataSource.manager.findOne(Post, { where: { id: parseInt(req.params.id) }, relations: ['user'] });
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

// POST - Criar uma nova postagem
app.post('/posts', async (req: Request, res: Response) => {
  const { userId, title, content } = req.body;
  const user = await AppDataSource.manager.findOne(User, { where: { id: userId } });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const post = AppDataSource.manager.create(Post, { title, content, user });
  await AppDataSource.manager.save(post);
  res.status(201).json(post);
});

// PUT - Atualizar uma postagem existente
app.put('/posts/:id', async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const post = await AppDataSource.manager.findOne(Post, { where: { id: parseInt(req.params.id) } });
  if (!post) return res.status(404).json({ message: 'Post not found' });

  post.title = title || post.title;
  post.content = content || post.content;
  await AppDataSource.manager.save(post);

  res.json(post);
});

// DELETE - Deletar uma postagem
app.delete('/posts/:id', async (req: Request, res: Response) => {
  const post = await AppDataSource.manager.findOne(Post, { where: { id: parseInt(req.params.id) } });
  if (!post) return res.status(404).json({ message: 'Post not found' });

  await AppDataSource.manager.remove(post);
  res.json({ message: 'Post deleted' });
});

// Configuração da porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
