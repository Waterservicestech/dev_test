import "reflect-metadata";
import express, { ErrorRequestHandler } from "express";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Post } from "./entity/Post";
import { z } from "zod";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from "./utils/allStatusCode";

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

const usersBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

app.post("/users", async (req, res, next) => {
  try {
    const body = req.body;

    const bodyValidation = await usersBodySchema.safeParseAsync(body);
    if (!bodyValidation.success)
      return res
        .status(BAD_REQUEST)
        .json({ error: bodyValidation.error.format() });

    const userObj = new User();
    userObj.firstName = bodyValidation.data.firstName;
    userObj.lastName = bodyValidation.data.lastName;
    userObj.email = bodyValidation.data.email;

    const userSaved = await AppDataSource.manager.save(userObj);

    return res.status(OK).json({ id: userSaved.id });
  } catch (error) {
    next(error);
  }
});

const postsBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  userId: z.number(),
});

app.post("/posts", async (req, res, next) => {
  try {
    const body = req.body;

    const bodyValidation = await postsBodySchema.safeParseAsync(body);
    if (!bodyValidation.success)
      return res
        .status(BAD_REQUEST)
        .json({ error: bodyValidation.error.format() });

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({
      id: bodyValidation.data.userId,
    });

    if (!user) return res.status(BAD_REQUEST).json({ error: "User not found" });

    const postObj = new Post();
    postObj.title = bodyValidation.data.title;
    postObj.description = bodyValidation.data.description;
    postObj.user = user;

    const postSaved = await AppDataSource.manager.save(postObj);

    return res.status(OK).json({ id: postSaved.id });
  } catch (error) {
    next(error);
  }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error({ serverError: err.message });
  res.status(INTERNAL_SERVER_ERROR).json({ err: "internal server error" });
};

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
