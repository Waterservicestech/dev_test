import express, { Request, Response } from 'express'
import { AppDataSource } from '../database/db'
import { User } from '../src/Entity/User'
import { Post } from '../src/Entity/Post'

const app = express()
app.use(express.json())

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((error) =>
    console.log('Error during Data Source initialization', error)
  )

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!')
})

// Endpoint to create an user
app.post('/users', async (req: Request, res: Response) => {
  const { firstName, lastName, email } = req.body
  const user = new User()
  user.firstName = firstName
  user.lastName = lastName
  user.email = email

  const userRepository = AppDataSource.getRepository(User)
  await userRepository.save(user)
  res.status(201).json(user)
})

// Endpoint to create a post
app.post('/posts', async (req: Request, res: Response) => {
  const { title, description, userId } = req.body
  const post = new Post()
  post.title = title
  post.description = description
  post.user = { id: userId } as User

  const postRepository = AppDataSource.getRepository(Post)
  await postRepository.save(post)
  res.status(201).json(post)
})

// Endpoint to list users
app.get('/users', async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User)
  const users = await userRepository.find({ relations: ['posts'] })
  res.json(users)
})

// Endpoint to list posts
app.get('/posts', async (req: Request, res: Response) => {
  const postRepository = AppDataSource.getRepository(Post)
  const posts = await postRepository.find({ relations: ['user'] })
  res.json(posts)
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
