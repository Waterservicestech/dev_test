"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const Post_1 = require("./entity/Post");
const zod_1 = require("zod");
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
    logging: true
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
app.post('/users', async (req, res) => {
    const userBodySchema = zod_1.z.object({
        firstName: zod_1.z.string(),
        lastName: zod_1.z.string(),
        email: zod_1.z.string().email()
    });
    const { firstName, lastName, email } = userBodySchema.parse(req.body);
    const userRepository = AppDataSource.getRepository(User_1.User);
    const user = new User_1.User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    const userCreated = await userRepository.save(user);
    res.status(201).send(userCreated);
});
app.post('/posts', async (req, res) => {
    const postBodySchema = zod_1.z.object({
        title: zod_1.z.string(),
        description: zod_1.z.string(),
        userId: zod_1.z.number()
    });
    const { title, description, userId } = postBodySchema.parse(req.body);
    const postRepository = AppDataSource.getRepository(Post_1.Post);
    const userRepository = AppDataSource.getRepository(User_1.User);
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
        throw new Error('User not found');
    }
    const post = new Post_1.Post();
    post.title = title;
    post.description = description;
    post.user = user;
    const postCreated = await postRepository.save(post);
    res.status(201).send(postCreated);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
