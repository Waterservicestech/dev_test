"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function testCreateUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post('http://localhost:3000/users', testUser);
            userId = response.data.id;
            console.log('User created successfully:', response.data);
        }
        catch (error) {
            console.error('Error creating user:', error);
        }
    });
}
const testPost = {
    title: "Some message",
    description: "Some description",
    userId: null
};
function testCreatePost() {
    return __awaiter(this, void 0, void 0, function* () {
        testPost.userId = userId;
        try {
            const response = yield axios_1.default.post('http://localhost:3000/posts', testPost);
            console.log('Post created successfully:', response.data);
        }
        catch (error) {
            console.error('Error creating post:', error);
        }
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        yield testCreateUser();
        yield testCreatePost();
    });
}
init();
