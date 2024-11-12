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
  try{
    const { firstName, lastName, email } = req.body;
    const insert = new User();
    const repository = await AppDataSource.getRepository(User);
    if(firstName.length == 0 || lastName.length == 0 || email.length == 0){
      return res.status(400).json({"error": "Missing required fields"})
    }
    insert.firstName = firstName;
    insert.lastName = lastName;
    insert.email = email;
    const save = await repository.save(insert);
    return res.status(201).json({"message": "User created successfully", "user": save});
  }catch(err){
    return res.status(500).json({ error: "Server error" });
  }
});

app.post('/posts', async (req, res) => {
  try{
    const { title, description, userId } = req.body;
    const insert = new Post();
    const repository = await AppDataSource.getRepository(Post);
    if(title.length == 0 || description.length == 0 || userId.length == 0){
      return res.status(400).json({"error": "Missing required fields"})
    }
    insert.title = title;
    insert.description = description;
    insert.userId = userId;
    const save = await repository.save(insert);
    return res.status(201).json({"message": "Post created successfully", "post": save});
  }catch(err){
    return res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
