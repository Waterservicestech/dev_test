"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_PORT = exports.DB_NAME = exports.DB_PASSWORD = exports.DB_USER = exports.DB_HOST = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    DB_HOST: zod_1.z.string(),
    DB_USER: zod_1.z.string(),
    DB_PASSWORD: zod_1.z.string(),
    DB_NAME: zod_1.z.string(),
    DB_PORT: zod_1.z.string().optional().default("3306"),
});
const env = envSchema.safeParse(process.env);
if (!env.success) {
    console.error("Invalid environment variables:", env.error.format());
    process.exit(1);
}
_a = env.data, exports.DB_HOST = _a.DB_HOST, exports.DB_USER = _a.DB_USER, exports.DB_PASSWORD = _a.DB_PASSWORD, exports.DB_NAME = _a.DB_NAME, exports.DB_PORT = _a.DB_PORT;
