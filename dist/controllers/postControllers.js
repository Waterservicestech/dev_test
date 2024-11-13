"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const postService_1 = __importDefault(require("../services/postService"));
const logger_1 = require("../middlewares/logger");
const createPost = async (req, res) => {
    const { title, description, userId } = req.body;
    if (!title || !description || !userId) {
        logger_1.httpLogger.error('Missing required fields', { body: req.body });
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const post = await postService_1.default.createPost(title, description, userId);
        logger_1.httpLogger.info('Post created successfully', { post });
        res.status(201).json(post);
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.httpLogger.error(error.message, { userId });
            res.status(404).json({ message: error.message });
        }
        else {
            logger_1.httpLogger.error('An unknown error occurred', { userId });
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};
exports.createPost = createPost;
