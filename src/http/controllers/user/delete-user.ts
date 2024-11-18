import { Request, Response } from 'express'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeDeleteUserUseCase } from '../../../use-cases/factories/make-delete-user-use-case'

export async function deleteUser(req: Request, res: Response) {
  const deleteUserParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = deleteUserParamsSchema.parse(req.params)

  try {
    const deleteUserUseCase = makeDeleteUserUseCase()

    await deleteUserUseCase.execute({ id })

    return res.status(204).end()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(400).json({ message: error.message })
    }

    throw error
  }
}
