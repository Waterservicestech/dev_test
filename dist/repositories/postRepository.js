"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepository = void 0;
const database_1 = require("../config/database");
const Post_1 = require("../entity/Post");
exports.postRepository = database_1.AppDataSource.getRepository(Post_1.Post);
