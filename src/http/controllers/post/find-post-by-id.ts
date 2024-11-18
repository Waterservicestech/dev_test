import { Request, Response } from 'express'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeFindPostByIdUseCase } from '../../../use-cases/factories/make-find-post-by-id-use-case'

export async function findPostById(req: Request, res: Response) {
  const findPostByIdParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = findPostByIdParamsSchema.parse(req.params)

  try {
    const findPostByIdUseCase = makeFindPostByIdUseCase()

    const { post } = await findPostByIdUseCase.execute({ id })

    return res.status(200).json({ post })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(400).json({ message: error.message })
    }

    throw error
  }
}
