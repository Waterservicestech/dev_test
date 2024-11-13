import winston from 'winston';

const { combine, timestamp, printf, colorize } = winston.format;
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';

export const httpLogger = winston.createLogger({
  format: combine(
    colorize(), 
    timestamp({ format: timestampFormat }),
    printf(({ timestamp, level, message, ...data }) => {
      const response = {
        level,
        timestamp,
        message,
        ...data,
      };

      return `${timestamp} [${level}]: ${message} ${Object.keys(data).length ? JSON.stringify(data, null, 2) : ''}`;
    })
  ),
  transports: [
    new winston.transports.Console()
  ],
});