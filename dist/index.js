"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const Post_1 = require("./entity/Post");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "test_db",
    entities: [User_1.User, Post_1.Post],
    synchronize: true,
});
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const initializeDatabase = async () => {
    await wait(20000);
    try {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");
    }
    catch (err) {
        console.error("Error during Data Source initialization:", err);
        process.exit(1);
    }
};
initializeDatabase();
app.get('/users', async (req, res) => {
    try {
        const users = await AppDataSource.getRepository(User_1.User).find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});
app.post('/users', async (req, res) => {
    try {
        const user = AppDataSource.getRepository(User_1.User).create(req.body);
        const result = await AppDataSource.getRepository(User_1.User).save(user);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
});
app.get('/posts', async (req, res) => {
    try {
        const posts = await AppDataSource.getRepository(Post_1.Post).find({ relations: ['user'] });
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching posts' });
    }
});
app.post('/posts', async (req, res) => {
    try {
        const post = AppDataSource.getRepository(Post_1.Post).create(req.body);
        const result = await AppDataSource.getRepository(Post_1.Post).save(post);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating post' });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
