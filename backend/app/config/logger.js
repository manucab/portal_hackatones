const winston = require('winston');
const stripFinalNewLine = require('strip-final-newline');
const morgan = require('morgan');
// TODO rotate files with winston-daily-rotate-file

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'cyan',
}

winston.addColors(colors)

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD -- HH:mm:ss:ms' }),
    winston.format.json(true),
    winston.format.prettyPrint(),
    winston.format.printf(
        (info) => `${info.timestamp} -- ${info.level}: ${info.message}`,
    ),
)

const formatDev = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD -- HH:mm:ss:ms' }),
    winston.format.json(true),
    winston.format.colorize({ all: true }),
    winston.format.prettyPrint(),
    winston.format.printf(
        (info) => `${info.timestamp} -- ${info.level}: ${info.message}`,
    ),
)

const transports = [

    // new winston.transports.Console({
    //     colorize: true
    // }),
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        zippedArchive: true,
        maxsize: 5242880,
        maxFiles: 31
    }),
    new winston.transports.File({
        filename: 'logs/all.log',
        zippedArchive: true,
        maxsize: 5242880,
        maxFiles: 31
    }),
    new winston.transports.File({
        filename: 'logs/access.log',
        leve: 'http',
        zippedArchive: true,
        maxsize: 5242880,
        maxFiles: 31

    }),
]


const logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
})

// Setup requests logger
morgan.token('id', req => req.id);
const requestFormat = ':method -- :url -- :id -- :status -- :res[content-length] - :response-time ms';
// ':remote-addr [:date[iso]] :id ":method :url" :status';

const requests = morgan(requestFormat, { stream: { write: (message) => { logger.http(stripFinalNewLine(message)) } } });

// TODO -- check this function
// logger.header = (req) => {

//     console.log('req', req.ip);

//     const date = new Date().toISOString();
//     return `${req.ip} -- ${date} -- ${req.id} -- ${req.method} -- ${req.originalUrl}`;
// }

// New trasnport to mode dev or not production
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: formatDev,
        colorize: true,
    }));
}

// Attach to logger object
logger.requests = requests;

module.exports = {
    logger,
    requests
};