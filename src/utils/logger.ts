import winston from "winston";
import "winston-daily-rotate-file";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      dirname: "logs",
      filename: "app-%DATE%.log",
      datePattern: "DD-MM-YYYY",
      maxFiles: "7d",
    }),
  ],
});

export default logger;
