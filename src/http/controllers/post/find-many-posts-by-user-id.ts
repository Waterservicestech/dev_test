import { Request, Response } from 'express'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeFindManyPostsByUserIdUseCase } from '../../../use-cases/factories/make-find-many-posts-by-user-id-use-case'

export async function findManyPostsByUserId(req: Request, res: Response) {
  const findManyPostsByUserIdQuerySchema = z.object({
    userId: z.coerce.number(),
  })

  const { userId } = findManyPostsByUserIdQuerySchema.parse(req.query)

  try {
    const findManyPostsByUserIdUseCase = makeFindManyPostsByUserIdUseCase()

    const { postList } = await findManyPostsByUserIdUseCase.execute({ userId })

    return res.status(200).json({ postList })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(400).json({ message: error.message })
    }

    throw error
  }
}
