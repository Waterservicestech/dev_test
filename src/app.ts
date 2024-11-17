import express, { Express, NextFunction, Request, Response } from 'express'
import swaggerUI from 'swagger-ui-express';
import 'express-async-errors';
import Youch from 'youch'

import { initializeDatabase } from './database';
import { routes } from './routes'
import { HttpException } from './@shared/errors/HttpException'

import swaggerFile from './swagger.json'

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
      this.server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
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
              const youch = new Youch(err, request)
              const html = await youch.toHTML()

              return response.send(html);
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