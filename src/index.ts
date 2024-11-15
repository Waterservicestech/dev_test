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
  database: process.env.DB_NAME || "teste_bruna",
  entities: [User,Post],
  synchronize: true,
});

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const initializeDatabase = async () => {
  await wait(20000);
  try {
    await AppDataSource.initialize();
    console.log("A base de dados foi inicializada!");
  } catch (err) {
    console.error("Erro durante a inicialização da base de dados:", err);
    process.exit(1);
  }
};

initializeDatabase();

app.post('/users', async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    // Validação básica
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes: firstName, lastName, email" });
    }

    // Cria um novo usuário
    const user = AppDataSource.getRepository(User).create({ firstName, lastName, email });
    const result = await AppDataSource.getRepository(User).save(user);

    res.status(200).json(result);
  } catch (error) {
    console.error("Erro na criação do usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});


app.post('/posts', async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    // Validação 
    if (!title || !description || !userId) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes: title, description, userId" });
    }

    // Busca o usuário pelo ID
    const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // Cria um novo post
    const post = AppDataSource.getRepository(Post).create({ title, description, user });
    const result = await AppDataSource.getRepository(Post).save(post);

    res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao criar um post:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta ${PORT}`);
});
