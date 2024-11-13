"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const database_1 = require("../config/database");
const User_1 = require("../entity/User");
exports.userRepository = database_1.AppDataSource.getRepository(User_1.User);
