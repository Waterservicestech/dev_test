
import { Request, Response } from "express";
import User from '../domain/User';
import UserService from '../service/UserService';
import validator from 'validator';
import { EmptyFieldError, EmailFormatInvalid} from '../errors/CustomizedErrors';

export default class UserController{

    private service: UserService;

    constructor(){
        this.service = new UserService();
    }

    saveUser = async (req: Request, res: Response) => {
        let currentUser = new User(req.body);

        let verified = this.verify(currentUser);

        if(verified){
            throw new EmptyFieldError("Empty Field or null", 400);
        } 

        const verifyEmail = validator.isEmail(currentUser.email);

        if(!verifyEmail) throw new EmailFormatInvalid("Invalid email", 400);
                
        await this.service.saveUser(currentUser);

        return res.status(201).send();
    }


    private verify = (user: User) => {
        return !user.email || !user.firstName || !user.lastName;
    }
    

}