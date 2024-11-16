import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './database';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';


const app = express();
app.use(express.json());

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

app.use('/users', userRoutes)
app.use('/posts', postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
