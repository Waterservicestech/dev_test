import { Request, Response } from 'express'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeUpdatePostUseCase } from '../../../use-cases/factories/make-update-post-use-case'

export async function updatePost(req: Request, res: Response) {
  const updatePostParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const updatePostBodySchema = z.object({
    title: z.string().min(3),
    description: z.string().min(3),
  })

  const { id } = updatePostParamsSchema.parse(req.params)

  const { title, description } = updatePostBodySchema.parse(req.body)

  try {
    const updatePostUseCase = makeUpdatePostUseCase()

    await updatePostUseCase.execute({ id, title, description })

    return res.status(204).end()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(400).json({ message: error.message })
    }

    throw error
  }
}
