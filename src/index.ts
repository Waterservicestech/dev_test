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

app.get('/users', async (req, res) => {
  const result = await AppDataSource.getRepository(User).find();
  return res.send(result);
});

app.post('/users', async (req, res) => {
  //Valida se a requisição possui todos os campos [firstName,lastName,email] definidos corretamente
  const {firstName, lastName, email} = req.body;
  if ((firstName === undefined || !firstName) ||
    (lastName === undefined || !lastName) ||
    (email === undefined || !email))
  {
    return res.status(400).send({success: false, message: "Mensagem inválida!"});
  }

  try
  {
    //Insere Usuário no banco de dados
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create({firstName, lastName, email});
    const result = await userRepository.save(user);

    //Retorna resultado da inserção com código 200
    return res.send(result);
  }
  catch (ex)
  {
    //Loga o erro e retorna mensagem tratada para o consumido com o status 400
    console.log(ex);
    return res.status(400).send({success: false, message: "Não foi possível inserir o usuário no banco de dados, tente novamente!"});
  }
  
});

app.post('/posts', async (req, res) => {
  //Valida se a requisição possui todos os campos [title,description,userId] definidos corretamente
  const {title, description, userId} = req.body;
  if ((title === undefined || !title) ||
    (description === undefined || !description) ||
    (userId === undefined || userId < 0))
  {
    return res.status(400).send({success: false, message: "Mensagem inválida!"});
  }

  try
  {
    //Valida se Id do usuário informado realmente existe
    const userRepository = AppDataSource.getRepository(User);
    if(!(await userRepository.existsBy({id: req.body.userId})))
    {
      return res.status(400).send({message: "Usuário não encontrado"});
    }

    //Insere Post no banco de dados
    const postRepository = AppDataSource.getRepository(Post);
    const post = postRepository.create({title, description, userId});
    const result = await postRepository.save(post);

    //Retorna resultado da inserção com código 200
    return res.send(result);
  }
  catch (ex)
  {
    //Loga o erro e retorna mensagem tratada para o consumidor com o status 400
    console.log(ex);
    return res.status(400).send({message: "Não foi possível inserir o post no banco de dados, tente novamente!"});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
