import express from 'express'

import { createUser } from './create-user'
import { findUserById } from './find-user-by-id'
import { findUserByEmail } from './find-user-by-email'
import { updateUser } from './update-user'
import { deleteUser } from './delete-user'

export const userRouters = express.Router()

userRouters.post('/users', createUser)
userRouters.get('/users/:id', findUserById)
userRouters.get('/users', findUserByEmail)
userRouters.put('/users/:id', updateUser)
userRouters.delete('/users/:id', deleteUser)
