import { Request, Response } from 'express'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeDeletePostUseCase } from '../../../use-cases/factories/make-delete-post-use-case'

export async function deletePost(req: Request, res: Response) {
  const deletePostParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = deletePostParamsSchema.parse(req.params)

  try {
    const deletePostUseCase = makeDeletePostUseCase()

    await deletePostUseCase.execute({ id })

    return res.status(204).end()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(400).json({ message: error.message })
    }

    throw error
  }
}
