import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './config/database';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import { httpLogger } from './middlewares/logger';
import { setupSwagger } from './config/swagger';

const app = express();
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('ping', (req, res) => res.send('pong'));

setupSwagger(app);

const initializeDatabase = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 10000));
    await AppDataSource.initialize();
    httpLogger.info("Data Source initialized successfully");
  } catch (err) {
    httpLogger.error("Failed to initialize Data Source", { error: err });
    process.exit(1);
  }
};

initializeDatabase();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  httpLogger.info(`Server is running on port ${PORT}`);
});