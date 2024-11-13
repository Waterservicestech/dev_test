import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import { Post } from '../entity/Post';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from '../utils/env';

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [User, Post],
  synchronize: true,
});