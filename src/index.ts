import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import express from "express";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Post } from "./entity/Post";
import { UserController } from "./controller/user.controller";
import { PostController } from "./controller/post.controller";


// Cria uma instância do Express e configura o middleware para lidar com requisições JSON.

const app = express();
app.use(express.json());


// Configura a conexão com o banco de dados usando TypeORM.

export const AppDataSource = new DataSource({
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
 * Função que aguarda um tempo determinado antes de executar uma ação.
 * Define um tempo em milissegundos para aguardar.
 * Retorna uma promessa que é resolvida após o tempo determinado.
 */
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Inicializa a conexão com o banco de dados.
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

// Configura as opções para gerar a documentação da API com Swagger.
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Minha API com Swagger",
      version: "1.0.0",
      description: "Documentação da API usando Swagger",
    },
  },
  apis: ["./src/**/*.ts"],
};

 // Gera a documentação da API com Swagger.
const swaggerSpec = swaggerJsdoc(options);

// Configura o endpoint para servir a documentação da API com Swagger.
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Cria instâncias dos controladores para lidar com requisições de usuários e posts.

const userController = new UserController();
const postController = new PostController();

// Configura os endpoints para lidar com requisições de usuários.
app.post("/users", userController.createUser.bind(userController));
app.get("/users", userController.getUsers.bind(userController));
app.get("/users/:id", userController.getUserById.bind(userController));
app.delete("/users/:id", userController.deleteUserById.bind(userController));


// Configura os endpoints para lidar com requisições de posts.
app.post("/posts", postController.createPost.bind(postController));
app.get("/posts", postController.getPosts.bind(postController));
app.get("/posts/:id", postController.getPostById.bind(postController));
app.delete("/posts/:id", postController.deletePostById.bind(postController));

// Configura a porta para ouvir requisições.
const PORT = process.env.PORT || 3000;


// Inicia o servidor e ouve requisições na porta configurada.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});