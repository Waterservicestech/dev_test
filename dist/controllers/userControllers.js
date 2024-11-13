"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const userService_1 = __importDefault(require("../services/userService"));
const logger_1 = require("../middlewares/logger");
const createUser = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    try {
        const user = await userService_1.default.createUser(firstName, lastName, email);
        logger_1.httpLogger.info('User created successfully', { user });
        res.status(201).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.httpLogger.error(error.message, { email });
            res.status(400).json({ message: error.message });
        }
        else {
            logger_1.httpLogger.error('An unknown error occurred', { email });
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};
exports.createUser = createUser;
