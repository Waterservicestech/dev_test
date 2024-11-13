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
  const {firstName,lastName, email} = req.body;
  if(!firstName||!lastName||!email){
    return res.status(400).json({message:"Missing required fields"})
  }
  const newUser = new User();
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.email = email;
  try {
    const addUser = await AppDataSource.manager.save(newUser);
    return res.status(201).json(addUser);
  } catch (error) {
    return res.status(500).json({message:"An error occurred while creating the user. Please try again later."})
  }
});

app.post('/posts', async (req, res) => {
  const {title,description,userId}= req.body;
  if(!title|| !description||!userId){
    return res.status(400).json({message:"Missing required fields"})
  }
  const newPost = new Post();
  newPost.title = title;
  newPost.description = description;
  newPost.user = userId;
  try {
    const addPost = await AppDataSource.manager.save(newPost);
    return res.status(201).json(addPost)
  } catch (error) {
    return res.status(500).json({message:"An error occurred while creating the post. Please try again later."})
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
