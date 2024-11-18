import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Post } from './entity/Post';
import { getEnv } from './config/env';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: getEnv('DB_HOST', 'localhost'),
  port: parseInt(getEnv('DB_PORT', '3306')),
  username: getEnv('DB_USER', 'root'),
  password: getEnv('DB_PASSWORD', 'password'),
  database: getEnv('DB_NAME', 'test_db'),
  entities: [User, Post],
  synchronize: true,
});

export default AppDataSource;