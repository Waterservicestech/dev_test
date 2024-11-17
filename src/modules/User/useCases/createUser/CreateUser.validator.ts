import { z } from 'zod'

const createUserInputValidator = z.object({
  firstName: z.string().max(100),
  lastName: z.string().max(100),
  email: z.string().email(),
})

export { createUserInputValidator }