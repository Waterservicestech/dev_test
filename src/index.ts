import 'reflect-metadata'
import 'express-async-errors'

import express from 'express'

import { userRouters } from './http/controllers/user/routes'
import { zodErrorsMiddleware } from './http/middlewares/zod-errors'
import { postRouters } from './http/controllers/post/routes'

export const app = express()

app.use(express.json())

app.use(userRouters)
app.use(postRouters)

app.use(zodErrorsMiddleware)
