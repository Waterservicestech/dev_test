import { z, ZodError, ZodIssue } from "zod";
import { Request, Response, NextFunction } from "express";

export function validateFields(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errorformatted = error.flatten((issue: ZodIssue) => ({
          message: issue.message,
        }));
        res.status(400).json({ error: "Invalid data", details: errorformatted.fieldErrors})
      } else {
        res.status(500).json(({ message: "Internal Server Error"}))
      }
    }
  }
}