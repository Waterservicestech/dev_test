"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./src/entity/User");
const Post_1 = require("./src/entity/Post");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    entities: [User_1.User, Post_1.Post],
});
