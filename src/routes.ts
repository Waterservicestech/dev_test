import { Router, Request, Response } from "express";

import { createUserController } from "./modules/User/useCases/createUser";
import { createPostController } from "./modules/Post/useCases/createPost/index";

const routes = Router();

routes.post('/users', (request: Request, response: Response) => {
    return createUserController.handle(request, response)
});

routes.post('/posts', (request: Request, response: Response) => {
    return createPostController.handle(request, response)
});

export { routes }