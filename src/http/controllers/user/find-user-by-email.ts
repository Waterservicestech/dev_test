import { Request, Response } from 'express'
import { z } from 'zod'
import { makeFindUserByEmailUseCase } from '../../../use-cases/factories/make-find-user-by-email-use-case'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'

export async function findUserByEmail(req: Request, res: Response) {
  const findUserByEmailQuerySchema = z.object({
    email: z.string().email(),
  })

  const { email } = findUserByEmailQuerySchema.parse(req.query)

  try {
    const findUserByEmailUseCase = makeFindUserByEmailUseCase()

    const { user } = await findUserByEmailUseCase.execute({ email })

    return res.status(200).json({ user })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(400).json({ message: error.message })
    }

    throw error
  }
}
