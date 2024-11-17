import { z } from 'zod'

const createPostInputValidator = z.object({
  title: z.string().max(100),
  description: z.string().max(100),
  userId: z.number().positive(),
})

export { createPostInputValidator }