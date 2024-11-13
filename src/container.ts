import { PostUseCase } from "@post/PostUseCase";
import { UserUseCase } from "@user/UserUseCase";
import { Container } from "inversify";

export const container = new Container();


container.bind<UserUseCase>(UserUseCase).toSelf();
container.bind<PostUseCase>(PostUseCase).toSelf();

