import "reflect-metadata";
import express from "express";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Post } from "./entity/Post";

const app = express();
app.use(express.json());

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "test_db",
  entities: [User, Post],
  synchronize: true,
});

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

app.post("/users", async (req, res) => {
  // Crie o endpoint de users

  /**
   * Captura os parâmetros que foram passados no
   * corpo da requisição.
   */
  const { firstName, lastName, email } = req.body;

  /**
   * Verifica se há algum parâmetro vazio e,
   * caso haja, um erro é retornado junto
   * com um STATUS CODE 400 (BAD REQUEST) .
   */
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: "All names and email are required." });
  }

  try {
    /**
     * Montagem de um registro do tipo
     * User com os parâmetros recebidos.
     */
    const user = AppDataSource.getRepository(User).create({
      firstName,
      lastName,
      email,
    });
    /**
     * O registro criado é salvo e um
     * STATUS CODE 201 (CREATED é retornado).
     */
    const result = await AppDataSource.getRepository(User).save(user);
    res.status(201).json(result);
  } catch (error) {
    /**
     * Trata de erros no ato de salvar
     * um registro no banco de dados,
     * retornando um STATUS CODE 500
     * (Internal Server Error) que
     * indica um erro de processamento.
     */
    console.error(error);
    res.status(500).json({ error: "Error saving user." });
  }
});

app.post("/posts", async (req, res) => {
  // Crie o endpoint de posts

  /**
   * Captura os parâmetros que foram passados no
   * corpo da requisição.
   */
  const { title, description, userId } = req.body;

  /**
   * Verifica se há algum parâmetro vazio e,
   * caso haja, um erro é retornado junto
   * com um STATUS CODE 400 (BAD REQUEST) .
   */
  if (!title || !description || !userId) {
    return res
      .status(400)
      .json({ error: "Title, description and userId are required." });
  }

  try {
    /**
     * Procura um registro de User no banco
     * de dados ao qual posui o id que
     * foi informado.
     */
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: userId },
    });

    /**
     * Se não encontrar nenhuma registro de User
     * com o id que foi informado um erro é
     * retornado junto com um STATUS CODE (400)
     * NOT FOUND.
     */
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    /**
     * Montagem de um registro do tipo
     * User com os parâmetros recebidos.
     */
    const post = AppDataSource.getRepository(Post).create({
      title,
      description,
      user,
    });

    /**
     * O registro criado é salvo e um
     * STATUS CODE 201 (CREATED é retornado).
     */
    const result = await AppDataSource.getRepository(Post).save(post);
    res.status(201).json(result);
  } catch (error) {
    /**
     * Trata de erros no ato de salvar
     * um registro no banco de dados,
     * retornando um STATUS CODE 500
     * (Internal Server Error) que
     * indica um erro de processamento.
     */
    console.error(error);
    res.status(500).json({ error: "Error saving post." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
