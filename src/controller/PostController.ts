
import { Request, Response } from "express";
import Post from '../domain/Post';
import PostService from '../service/PostService';
import { EmptyFieldError } from '../errors/CustomizedErrors';

export default class PostController{

    private service: PostService;

    constructor(){
        this.service = new PostService();
    }

    savePost = async (req: Request, res: Response) => {
        let currentPost = new Post(req.body);

        let verified = this.verify(currentPost);

        if(verified){
            throw new EmptyFieldError("Empty Field or null", 400);
        } 

        await this.service.savePost(currentPost);

        return res.status(201).send();
    }

    private verify = (post: Post) => {
        return !post.title || !post.description || !post.userId;
    }

}