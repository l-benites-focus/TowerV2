import { createLogger, format, transports } from 'winston';
const { combine, timestamp, simple } = format;

const logger = createLogger({
    transports: [new transports.Console()],
    exitOnError: true,
    exceptionHandlers: [
        new transports.Console(),
        new transports.File({ filename: 'exceptions.log' }),
    ],
    format: combine(timestamp(), simple()),
});

export default logger;
