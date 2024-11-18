import { Request, Response, NextFunction } from 'express';

class Validations {
    static validateUser(req: Request, res: Response, next: NextFunction) {
        const user = req.body;
        const requiredKeys = ['firstName', 'lastName', 'email'];
        const notFoundKey = requiredKeys.find((key) => !(key in user));
        if (notFoundKey) {
            return res.status(400).json({ message: `${notFoundKey} is required` });
        }
        next();
    }

    static validatePost(req: Request, res: Response, next: NextFunction) {
        const post = req.body;
        const requiredKeys = ['title', 'description', 'userId'];
        const notFoundKey = requiredKeys.find((key) => !(key in post));
        if (notFoundKey) {
            return res.status(400).json({ message: `${notFoundKey} is required` });
        }
        next();
    }
}

export default Validations;