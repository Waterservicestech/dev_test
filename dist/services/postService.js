"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postRepository_1 = require("../repositories/postRepository");
const userRepository_1 = require("../repositories/userRepository");
const Post_1 = require("../entity/Post");
const logger_1 = require("../middlewares/logger");
class PostService {
    async createPost(title, description, userId) {
        const user = await userRepository_1.userRepository.findOneBy({ id: userId });
        if (!user) {
            logger_1.httpLogger.error('User not found', { userId });
            throw new Error('User not found');
        }
        const post = new Post_1.Post();
        post.title = title;
        post.description = description;
        post.user = user;
        await postRepository_1.postRepository.save(post);
        return post;
    }
    async getPosts() {
        return postRepository_1.postRepository.find();
    }
    async getPostById(id) {
        return postRepository_1.postRepository.findOneBy({ id });
    }
    async getPostsByUserId(userId) {
        return postRepository_1.postRepository.find({ where: { user: { id: userId } } });
    }
    async getPostByDescription(description) {
        return postRepository_1.postRepository.findOne({ where: { description } });
    }
    async updatePost(id, title, description) {
        const post = await postRepository_1.postRepository.findOneBy({ id });
        if (!post) {
            logger_1.httpLogger.error('Post not found', { id });
            throw new Error('Post not found');
        }
        post.title = title;
        post.description = description;
        await postRepository_1.postRepository.save(post);
        return post;
    }
    async deletePost(id) {
        const post = await postRepository_1.postRepository.findOneBy({ id });
        if (!post) {
            logger_1.httpLogger.error('Post not found', { id });
            throw new Error('Post not found');
        }
        await postRepository_1.postRepository.remove(post);
    }
}
exports.default = new PostService();
