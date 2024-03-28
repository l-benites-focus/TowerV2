"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, simple } = winston_1.format;
const logger = (0, winston_1.createLogger)({
    transports: [new winston_1.transports.Console()],
    exitOnError: true,
    exceptionHandlers: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: 'exceptions.log' }),
    ],
    format: combine(timestamp(), simple()),
});
exports.default = logger;
