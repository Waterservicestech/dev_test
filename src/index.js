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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const User_1 = require("./entity/User");
const Post_1 = require("./entity/Post");
const dbconfig_1 = require("./config/dbconfig");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield wait(20000);
    try {
        yield dbconfig_1.AppDataSource.initialize();
        console.log("Data Source has been initialized!");
    }
    catch (err) {
        console.error("Error during Data Source initialization:", err);
        process.exit(1);
    }
});
initializeDatabase();
// Endpoint para gerenciar usuários
app.get("/users", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield dbconfig_1.AppDataSource.getRepository(User_1.User).find({ relations: ["posts"] });
    res.json(users);
}));
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield dbconfig_1.AppDataSource.getRepository(User_1.User).save(req.body);
    res.status(201).json(user);
}));
// Endpoint para gerenciar posts
app.get("/posts", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield dbconfig_1.AppDataSource.getRepository(Post_1.Post).find({ relations: ["user"] });
    res.json(posts);
}));
app.post("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield dbconfig_1.AppDataSource.getRepository(Post_1.Post).save(req.body);
    res.status(201).json(post);
}));
// Conectar ao banco e iniciar o servidor
dbconfig_1.AppDataSource.initialize().then(() => {
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
});
