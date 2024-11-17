import 'reflect-metadata';
import { DataSource } from "typeorm";

const DB_PORT = Number(process.env.DB_PORT)

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "db",
    port: DB_PORT || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "test_db",
    entities: [
        `${__dirname}/../modules/**/entities/*{.ts,.js}`,
    ],
    synchronize: true
  });
  
export { AppDataSource }