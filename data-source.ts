import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./src/entity/User";
import { Post } from "./src/entity/Post";

// export const AppDataSource = new DataSource({
//     type: "sqlite",
//     database: "database.sqlite",
//     synchronize: true,
//     entities: [User, Post],
// });