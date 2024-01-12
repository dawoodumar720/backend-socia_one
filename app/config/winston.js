const winston = require("winston");
const fileSize = 1024 * 1024 * 100; // 100 MB

const defaultFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.printf(function ({ timestamp, level, label, message, stack }) {
    const namespace = label ? `(${label})` : "";
    const errStack = stack ? `\n${stack}` : "";
    return `[${timestamp}] ${level}:${namespace} ${message} ${errStack}`;
  })
);
module.exports = winston.createLogger({
  format: defaultFormat,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(winston.format.colorize(), defaultFormat),
    }),
    new winston.transports.File({
      dirname: "logs/error",
      filename: "error.log",
      level: "error",
      maxsize: fileSize,
    }),
    new winston.transports.File({
      dirname: "logs/info",
      filename: "info.log",
      level: "info",
      maxsize: fileSize,
    }),
    new winston.transports.File({
      dirname: "logs/http",
      filename: "http.log",
      level: "http",
      maxsize: fileSize,
    }),
    new winston.transports.File({
      dirname: "logs/debug",
      filename: "debug.log",
      level: "debug",
      maxsize: fileSize,
    }),
    new winston.transports.File({
      dirname: "logs/silly",
      filename: "silly.log",
      level: "silly",
      maxsize: fileSize,
    }),
  ],
});
