import { Request, Response } from 'express'
import { z } from 'zod'
import { makeCreatePostUseCase } from '../../../use-cases/factories/make-create-post-use-case'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'

export async function createPost(req: Request, res: Response) {
  const createPostBodySchema = z.object({
    title: z.string().min(3),
    description: z.string().min(3),
    userId: z.coerce.number(),
  })

  const { title, description, userId } = createPostBodySchema.parse(req.body)

  try {
    const createPostUseCase = makeCreatePostUseCase()

    const { post } = await createPostUseCase.execute({
      title,
      description,
      userId,
    })

    return res.status(201).json({ ...post })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(400).json({ message: error.message })
    }

    throw error
  }
}
