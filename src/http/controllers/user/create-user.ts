import { Request, Response } from 'express'
import { z } from 'zod'
import { makeCreateUserUseCase } from '../../../use-cases/factories/make-create-user-use-case'

export async function createUser(req: Request, res: Response) {
  const createUserBodySchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string().email(),
  })

  const { firstName, lastName, email } = createUserBodySchema.parse(req.body)

  const createUserUseCase = makeCreateUserUseCase()

  const { user } = await createUserUseCase.execute({
    firstName,
    lastName,
    email,
  })

  return res.status(201).json({ ...user })
}
