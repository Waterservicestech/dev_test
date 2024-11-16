import { Request, Response, NextFunction } from "express";
import { ZodError, ZodObject, ZodRawShape } from "zod";
import {
  BAD_REQUEST_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
} from "../utils/constants";

export function validateData(schema: ZodObject<ZodRawShape>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res
          .status(BAD_REQUEST_STATUS_CODE)
          .json({ error: "Invalid data", details: errorMessages });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
          .json({ error: "Internal Server Error" });
      }
    }
  };
}
