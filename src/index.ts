import express from 'express';
import userRoutes from './routes/usersRoutes';
import postRoutes from './routes/postsRoutes';
import { AppDataSource } from './config/data-source';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORTSERVER) || 3000;

// Função para inicializar o banco de dados e iniciar o servidor
const initializeDatabaseAndServer = async () => {
  let attempts = 0;
  const maxAttempts = 5;

  while (attempts < maxAttempts) {
    try {
      // Inicializando o banco de dados
      await AppDataSource.initialize();
      console.log("Data Source has been initialized!");

      // Iniciar o servidor após o banco de dados ser inicializado
      app.use(userRoutes);
      app.use(postRoutes);

      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });

      break; // Sai do loop se a inicialização for bem-sucedida
    } catch (err) {
      attempts++;
      console.error(`Attempt ${attempts} failed to initialize the database:`, err);

      if (attempts === maxAttempts) {
        console.error("Max attempts reached. Could not connect to the database.");
        process.exit(1); // Finaliza o processo se não for possível se conectar após várias tentativas
      }

      // Aguarda 5 segundos antes de tentar novamente
      console.log("Retrying in 5 seconds...");
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

// Chama a função para inicializar o banco de dados e iniciar o servidor
initializeDatabaseAndServer();