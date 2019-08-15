import winston, { format } from 'winston';

const { combine, timestamp, prettyPrint } = format;

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    prettyPrint(),
  ),
  defaultMeta: { service: 'vehicles' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({ format: winston.format.json() })
  ],
})


export default logger;
