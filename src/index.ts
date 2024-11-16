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



app.post('/users', async (req, res) => {
  const { firstName, lastName, email } = req.body;
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ message: 'Campos obrigatórios não preenchidos' });
  }
  const user = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  try {
    await AppDataSource.manager.save(user);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao criar usuário', error: err });
  }
});


app.post('/posts', async (req, res) => {
  const { title, description, userId } = req.body

  if (!title || !description || !userId) {
    return res.status(400).json({ message: 'Campos obrigatórios não preenchidos' });
  }
  const user = await AppDataSource.manager.findOne(User, { where: { id: userId } });
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  const post = new Post();
  post.title = title;
  post.description = description;
  post.user = user;

  try {
    await AppDataSource.manager.save(post);
    return res.status(201).json(post);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao criar post', error: err });
  }
});

//   EndPoits Extras
app.get('/users', async (req, res) => {
  try {
    const users = await AppDataSource.manager.find(User);
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao buscar usuários', error: err });
  }
});

app.get('/users/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }
  try {
    const user = await AppDataSource.manager.findOne(User, { where: { id } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao buscar usuário', error: err });
  }
});

app.delete('/users/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }
  try {
    const user = await AppDataSource.manager.findOne(User, { where: { id } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await AppDataSource.manager.remove(User, user);
    return res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao deletar usuário', error: err });
  }
});

app.put('/users/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { firstName, lastName, email } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }
  try {
    const user = await AppDataSource.manager.findOne(User, { where: { id } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    await AppDataSource.manager.save(user);
    return res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao atualizar usuário', error: err });
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await AppDataSource.manager.find(Post, {
      relations: ['user'] 
    });
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao buscar postagens', error: err });
  }
});

app.get('/posts/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }
  try {
    const post = await AppDataSource.manager.findOne(Post, {
      where: { id },
      relations: ['user'] 
    });
    
    if (!post) {
      return res.status(404).json({ message: 'Postagem não encontrada' });
    }
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao buscar postagem', error: err });
  }
});

app.delete('/posts/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }
  try {
    const post = await AppDataSource.manager.findOne(Post, {
      where: { id },
      relations: ['user']
    });
    
    if (!post) {
      return res.status(404).json({ message: 'Postagem não encontrada' });
    }
    await AppDataSource.manager.remove(Post, post);
    return res.status(200).json({ message: 'Postagem deletada com sucesso' });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao deletar postagem', error: err });
  }
});

app.put('/posts/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, description } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    const post = await AppDataSource.manager.findOne(Post, {
      where: { id },
      relations: ['user']
    });

    if (!post) {
      return res.status(404).json({ message: 'Postagem não encontrada' });
    }

    post.title = title || post.title;
    post.description = description || post.description;

    await AppDataSource.manager.save(post);
    return res.status(200).json({ message: 'Postagem atualizada com sucesso', post });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao atualizar postagem', error: err });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


