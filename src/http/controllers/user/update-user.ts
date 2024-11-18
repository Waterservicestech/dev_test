import { Request, Response } from 'express'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeUpdateUserUseCase } from '../../../use-cases/factories/make-update-user-use-case'

export async function updateUser(req: Request, res: Response) {
  const updateUserParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const updateUserBodySchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string().email(),
  })

  const { id } = updateUserParamsSchema.parse(req.params)

  const { firstName, lastName, email } = updateUserBodySchema.parse(req.body)

  try {
    const updateUserUseCase = makeUpdateUserUseCase()

    await updateUserUseCase.execute({ id, firstName, lastName, email })

    return res.status(204).end()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(400).json({ message: error.message })
    }

    throw error
  }
}
