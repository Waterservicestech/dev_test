import { z } from "zod";

export const postSchemaValidation = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(100),
  userId: z.number().int().positive().min(1),
})