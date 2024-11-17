import express, { Express, NextFunction, Request, Response } from 'express'
import 'express-async-errors';

import { initializeDatabase } from './database';
import { routes } from './routes'
import { HttpException } from './@shared/errors/HttpException'

initializeDatabase()

class App {
    private server: Express

    constructor() {
        this.server = express()

        this.middlewares()
        this.routes()
        this.exceptionHandler()
    }

    get getServer() {
        return this.server
    }

    private routes() {
        this.server.use(routes)
    }

    private middlewares() {
        this.server.use(express.json())
    }

    private exceptionHandler() {
        this.server.use(
          async (
            err: Error | HttpException,
            request: Request,
            response: Response,
            next: NextFunction
          ) => {
            if (process.env.NODE_ENV === 'development') {
              return response.send(err)
            }
            
            if (err instanceof HttpException) {
              return response.status(err.statusCode).json({ message: err.message });
            }
    
            return response.status(500).json({ message: 'Internal server error' });
          }
        );
      }
}

export { App }