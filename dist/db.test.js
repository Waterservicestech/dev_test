"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const testUser = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com"
};
let userId = null;
async function testCreateUser() {
    try {
        const response = await axios_1.default.post('http://localhost:3000/users', testUser);
        userId = response.data.id;
        console.log('User created successfully:', response.data);
    }
    catch (error) {
        console.error('Error creating user:', error);
    }
}
const testPost = {
    title: "Some message",
    description: "Some description",
    userId: null
};
async function testCreatePost() {
    testPost.userId = userId;
    try {
        const response = await axios_1.default.post('http://localhost:3000/posts', testPost);
        console.log('Post created successfully:', response.data);
    }
    catch (error) {
        console.error('Error creating post:', error);
    }
}
async function init() {
    await testCreateUser();
    await testCreatePost();
}
init();
