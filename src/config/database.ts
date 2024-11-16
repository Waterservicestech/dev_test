import { DataSource } from "typeorm";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { wait } from "../utils/functions";
import { envServerSchema } from "../utils/env";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = envServerSchema;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST || "localhost",
  port: Number(DB_PORT) || 3306,
  username: DB_USER || "root",
  password: DB_PASSWORD || "password",
  database: DB_NAME || "test_db",
  entities: [User, Post],
  synchronize: true,
});

export const initializeDatabase = async () => {
  await wait(200);
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
    process.exit(1);
  }
};
