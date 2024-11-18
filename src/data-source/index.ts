import { DataSource } from 'typeorm'
import { User } from '../entity/User'
import { Post } from '../entity/Post'
import { env } from '../env'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.DB_HOST || 'localhost',
  port: 3306,
  username: env.DB_USER || 'root',
  password: env.DB_PASSWORD || 'password',
  database: env.DB_NAME || 'test_db',
  entities: [User, Post],
  synchronize: true,
})

if (!AppDataSource.isInitialized) {
  AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!')
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err)
    })
}
