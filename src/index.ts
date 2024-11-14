import 'reflect-metadata'
import express from 'express'
import { Request, Response } from 'express'
import { DataSource } from 'typeorm'
import { User } from './entities/User'
import { Post } from './entities/Post'

const app = express()
app.use(express.json())

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'test_db',
  entities: [User, Post],
  synchronize: true
})

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const initializeDatabase = async () => {
  await wait(20000)
  try {
    await AppDataSource.initialize()
    console.log('Data Source has been initialized!')
  } catch (err) {
    console.error('Error during Data Source initialization:', err)
    process.exit(1)
  }
}

initializeDatabase()

app.post('/users', async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User)
  try {
    const { firstName, lastName, email } = req.body
    if (!firstName || !lastName || !email) {
      return res
        .status(400)
        .json({ error: 'First name, last name, and email are required' })
    }

    const existingUser = await userRepository.findOneBy({ email })
    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' })
    }

    const newUser = new User()
    newUser.firstName = firstName
    newUser.lastName = lastName
    newUser.email = email

    await userRepository.save(newUser)

    res
      .status(201)
      .json({ id: newUser.id, message: 'User created successfully' })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/posts', async (req: express.Request, res: express.Response) => {
  const postRepository = AppDataSource.getRepository(Post)
  try {
    const { title, description } = req.body
    const userId = parseInt(req.body.userId as string, 10)

    if (!title || !description || isNaN(userId)) {
      return res
        .status(400)
        .json({ error: 'Title, description, and userId are required' })
    }

    const user = await AppDataSource.getRepository(User).findOneBy({
      id: userId
    })
    if (!user) {
      return res
        .status(404)
        .json({ error: 'User not found. Please crete an account' })
    }

    const newPost = new Post()
    newPost.title = title
    newPost.description = description
    newPost.user = user

    await postRepository.save(newPost)

    res
      .status(201)
      .json({ id: newPost.id, message: 'Post created successfully' })
  } catch (error) {
    console.error('Error creating post:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/users', async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User)

  try {
    const users = await userRepository.find()
    res.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Internal server error' })
  }

  res.status(200).json({ message: 'Users fetched successfully' })
})

app.get('/posts', async (req: Request, res: Response) => {
  const postRepository = AppDataSource.getRepository(Post)

  try {
    const posts = await postRepository.find()
    res.json(posts)
  } catch (error) {}

  res.status(200).json({ message: 'Posts fetched successfully' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
