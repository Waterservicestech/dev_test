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
  try {
    const { firstName, lastName, email } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'Please provide firstName, lastName, and email' });
    }

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    // Save the user to the database
    await AppDataSource.manager.save(user);

    return res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }});

app.post('/posts', async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    // Basic validation
    if (!title || !description || !userId) {
      return res.status(400).json({ message: 'Please provide title, description, and userId' });
    }

    // Check if the user exists
    const user = await AppDataSource.manager.findOneBy(User, { id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const post = new Post();
    post.title = title;
    post.description = description;
    post.user = user; // Associate the post with the user

    // Save the post to the database
    await AppDataSource.manager.save(post);

    return res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
