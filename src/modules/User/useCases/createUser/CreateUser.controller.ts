import { Response, Request } from "express";

import { HttpException } from "../../../../@shared/errors/HttpException";
import { createUserInputValidator } from "./CreateUser.validator";
import { CreateUserService } from "./CreateUser.service";

class CreateUserController {
    constructor(private createUserService: CreateUserService) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { data, success } = createUserInputValidator.safeParse(request.body)

        if (!success) {
            throw new HttpException('Invalid input.', 400)
        }

        const { email, firstName, lastName } = data;
        
        const user = await this.createUserService.execute({ email, firstName, lastName })

        return response.status(201).json(user);
    }
}

export { CreateUserController }

