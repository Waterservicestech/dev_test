import { z } from 'zod';

export const postRegistrationSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(100),
  userId: z.number(),
});
