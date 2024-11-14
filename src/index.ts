import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Post } from './entity/Post';

const app = express();
app.use(express.json());

/**
 * AppDataSource é responsável por configurar a conexão com o banco de dados MySQL usando o TypeORM.
 * 
 * Recebe:
 *  - type (string) : O tipo de banco de dados (MySQL).
 *  - host (string) : O host do banco de dados (padrão: localhost).
 *  - port (number) : A porta do banco de dados MySQL (padrão: 3306).
 *  - username (string) : O nome de usuário do banco de dados (padrão: root).
 *  - password (string) : A senha do banco de dados.
 *  - database (string) : O nome do banco de dados (padrão: test_db).
 *  - entities (array) : As entidades que o TypeORM gerenciará (User e Post).
 *  - synchronize (boolean) : Se o banco de dados será sincronizado com as entidades automaticamente (não recomendado para produção).
 * 
 * Retorno:
 *  - DataSource : Retorna o objeto que gerencia a conexão e interações com o banco de dados.
 */
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

/**
 * wait é responsável por criar uma pausa no código por um tempo determinado.
 * 
 * Recebe:
 *  - ms (number) : O tempo, em milissegundos, que o código irá aguardar.
 * 
 * Retorno:
 *  - Promise : Retorna uma promise que resolve após o tempo definido.
 */
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * initializeDatabase é responsável por inicializar a conexão com o banco de dados.
 * 
 * A função aguarda 20 segundos para garantir que o banco de dados esteja pronto para aceitar conexões,
 * e em seguida tenta inicializar a conexão com o banco usando o AppDataSource.
 * 
 * Se a inicialização for bem-sucedida, uma mensagem é exibida no console. Caso contrário, o processo é encerrado com erro.
 */
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

/**
 * Função para excluir um usuário pelo e-mail.
 * 
 * Recebe:
 *  - req (Request) : A requisição HTTP contendo o parâmetro de e-mail do usuário a ser excluído.
 *  - res (Response) : A resposta HTTP que será enviada ao cliente após o processo.
 * 
 * Retorno:
 *  - Response : Retorna um código de status 404 caso o usuário não seja encontrado ou um código 200 caso o usuário seja excluído com sucesso.
 */
app.delete('/users/email/:email', async (req, res) => {
  try {
    const userRepository = AppDataSource.getRepository(User); 
    const user = await userRepository.findOneBy({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await userRepository.remove(user);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: "Error deleting user" });
  }
});

/**
 * Função para criar um novo usuário no sistema.
 * 
 * Recebe:
 *  - req (Request) : A requisição HTTP contendo os dados do novo usuário.
 *  - res (Response) : A resposta HTTP que será enviada ao cliente após a criação do usuário.
 * 
 * Retorno:
 *  - Response : Retorna um código de status 400 se o e-mail já estiver cadastrado ou 201 se o usuário for criado com sucesso.
 */
app.post('/users', async (req, res) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    
    // Verifica se já existe um usuário com o mesmo e-mail
    const existingUser = await userRepository.findOneBy({ email: req.body.email });
    if (existingUser) {
      // Caso o usuário com o e-mail já exista, retorna a mensagem de erro personalizada
      return res.status(400).json({ error: "usuario ja cadastrado" });
    }
    
    // Cria e salva o novo usuário
    const user = userRepository.create(req.body);
    await userRepository.save(user);
    res.status(201).json(user);
  } catch (error) {
    console.error('Detailed error creating user:', error);
    res.status(500).json({ error: "Error creating user" });
  }
});

/**
 * Função para obter todos os usuários cadastrados no sistema.
 * 
 * Recebe:
 *  - req (Request) : A requisição HTTP.
 *  - res (Response) : A resposta HTTP com a lista de usuários.
 * 
 * Retorno:
 *  - Response : Retorna a lista de usuários ou um erro caso ocorra algum problema.
 */
app.get('/users', async (req, res) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

/**
 * Função para criar um novo post no sistema.
 * 
 * Recebe:
 *  - req (Request) : A requisição HTTP contendo os dados do novo post.
 *  - res (Response) : A resposta HTTP que será enviada ao cliente após a criação do post.
 * 
 * Retorno:
 *  - Response : Retorna o post criado ou um erro em caso de falha.
 */
app.post('/posts', async (req, res) => {
  try {
    const postRepository = AppDataSource.getRepository(Post);
    const post = postRepository.create(req.body);
    await postRepository.save(post);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error creating post" });
  }
});

/**
 * Função para obter todos os posts registrados no sistema.
 * 
 * Recebe:
 *  - req (Request) : A requisição HTTP.
 *  - res (Response) : A resposta HTTP com a lista de posts.
 * 
 * Retorno:
 *  - Response : Retorna a lista de posts ou um erro caso ocorra algum problema.
 */
app.get('/posts', async (req, res) => {
  try {
    const postRepository = AppDataSource.getRepository(Post);
    const posts = await postRepository.find({ relations: ["user"] });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
});

// Define a porta do servidor e inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
