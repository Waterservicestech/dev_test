import { Request, Response } from 'express'
import { z } from 'zod'
import { makeFindUserByIdUseCase } from '../../../use-cases/factories/make-find-user-by-id-use-case'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'

export async function findUserById(req: Request, res: Response) {
  const findUserByIdParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = findUserByIdParamsSchema.parse(req.params)

  try {
    const findUserByIdUseCase = makeFindUserByIdUseCase()

    const { user } = await findUserByIdUseCase.execute({ id })

    return res.status(200).json({ user })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(400).json({ message: error.message })
    }

    throw error
  }
}
