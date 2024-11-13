"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const Post_1 = require("../entity/Post");
const env_1 = require("../utils/env");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: env_1.DB_HOST,
    port: parseInt(env_1.DB_PORT, 10),
    username: env_1.DB_USER,
    password: env_1.DB_PASSWORD,
    database: env_1.DB_NAME,
    entities: [User_1.User, Post_1.Post],
    synchronize: true,
});
