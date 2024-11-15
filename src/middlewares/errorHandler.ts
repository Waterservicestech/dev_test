import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'class-validator';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Array && err[0] instanceof ValidationError) {
    const errors = err.map((e: ValidationError) => {
      return {
        field: e.property,
        message: Object.values(e.constraints || {}).join(', ')
      };
    });

    return res.status(400).json({ errors });
  }

  res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;