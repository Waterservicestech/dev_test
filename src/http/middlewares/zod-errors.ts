import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

export function zodErrorsMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  console.error(error)

  res.status(500).json({ message: 'Internal Server Error' })

  next()
}
