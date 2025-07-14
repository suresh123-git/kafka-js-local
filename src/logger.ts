import * as winston from 'winston';
import LokiTransport from 'winston-loki';
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new LokiTransport({
      host: 'http://localhost:3100', // 🔁 Loki endpoint (change if running inside Docker)
      labels: { app: 'nestjs-service' },
      json: true,
    }),
  ],
});

export default logger;
