import 'reflect-metadata';
import express, {Response, Request, response} from 'express';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Post } from './entity/Post';
import { CreateUserDTO } from './CreateUserDTO';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreatePostDTO } from './CreatePostDTO';

const app = express();
app.use(express.json());

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'test_db',
  entities: [User, Post],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development' ? true : false,
});


const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const initializeDatabase = async () => {
  await wait(20000);
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (err) {
    console.error('Error during Data Source initialization:', err);
    process.exit(1);
  }
};

initializeDatabase();

app.post('/users', async (req: Request, res: Response) => {
  try {
    const userDTO = plainToClass(CreateUserDTO, req.body )

    validate(userDTO).then(errors => {
      if (errors.length > 0) {
        return res.status(400).json({ message: 'Invalid Data', errors });
      }
    });
    
    const user = new User(userDTO.firstName, userDTO.lastName, userDTO.email);
    
    const response = await AppDataSource.getRepository(User).save(user);
  
    return res.status(201).json(response);
  } catch {
    return res.status(500).json({message: 'Error to create a new user'});
  }

});

app.post('/posts', async (req: Request, res: Response) => {
  try {
    const postDTO = plainToClass(CreatePostDTO, req.body )

    validate(postDTO).then(errors => {
      if (errors.length > 0) {
        return res.status(400).json({ message: 'Invalid Data', errors });
      }
    });
    
    const userExists = await AppDataSource.getRepository(User).findOne({where: {id: postDTO.userId}});
    if(!userExists) return res.status(404).json({message: 'User id does not exists.'});
  
    const post = new Post(postDTO.title, postDTO.description, postDTO.userId);
  
    const response = await AppDataSource.getRepository(Post).save(post);
  
    return res.status(201).json(response);
  } catch {
    return res.status(500).json({message: 'Error to create a new post', status: 'error'});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
