"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const { combine, timestamp, json, printf } = winston_1.default.format;
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';
// Logger for API endpoints
exports.httpLogger = winston_1.default.createLogger({
    format: combine(timestamp({ format: timestampFormat }), json(), printf(({ timestamp, level, message, ...data }) => {
        const response = {
            level,
            timestamp,
            message,
            data,
        };
        return JSON.stringify(response);
    })),
    transports: [
        new winston_1.default.transports.Console()
    ],
});
