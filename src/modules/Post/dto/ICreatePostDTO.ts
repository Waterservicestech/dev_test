import { User } from "../../User/entities/User";

export interface ICreatePostDTO {
    title: string
    description: string
    user: User;
}