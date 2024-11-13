"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const logger_1 = require("./middlewares/logger");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', userRoutes_1.default);
app.use('/api', postRoutes_1.default);
app.get('/ping', (req, res) => {
    res.status(200).json({ message: 'pong' });
});
const initializeDatabase = async () => {
    try {
        await database_1.AppDataSource.initialize();
        logger_1.httpLogger.info("Data Source initialized successfully");
    }
    catch (err) {
        logger_1.httpLogger.error("Failed to initialize Data Source", { error: err });
        process.exit(1);
    }
};
initializeDatabase();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger_1.httpLogger.info(`Server is running on port ${PORT}`);
});
