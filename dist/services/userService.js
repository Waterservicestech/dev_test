"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const User_1 = require("../entity/User");
const logger_1 = require("../middlewares/logger");
class UserService {
    constructor() {
        this.userRepository = database_1.AppDataSource.getRepository(User_1.User);
    }
    async createUser(firstName, lastName, email) {
        if (!firstName || !lastName || !email) {
            logger_1.httpLogger.error('Missing required fields', { firstName, lastName, email });
            throw new Error('Invalid data');
        }
        const isEmailAlreadyInUse = await this.userRepository.findOneBy({ email });
        if (isEmailAlreadyInUse) {
            logger_1.httpLogger.error('Email already in use', { email });
            throw new Error('Email already in use');
        }
        const user = new User_1.User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        try {
            await this.userRepository.save(user);
            logger_1.httpLogger.info('User created successfully', { user });
            return user;
        }
        catch (error) {
            if (error instanceof Error) {
                logger_1.httpLogger.error(error.message, { email });
            }
            else {
                logger_1.httpLogger.error('An unknown error occurred', { email });
            }
            throw error instanceof Error
                ? error
                : new Error('An unknown error occurred');
        }
    }
}
exports.default = new UserService();
