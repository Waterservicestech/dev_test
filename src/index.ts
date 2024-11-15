import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './database';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(express.json());

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const initializeDatabase = async () => {
  await wait(3000);
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
    process.exit(1);
  }
};

initializeDatabase();

app.use('/users', userRoutes)

app.post('/posts', async (req, res) => {
// Crie o endpoint de posts
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
