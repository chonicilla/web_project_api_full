const fs = require('fs');
const path = require('path');
const winston = require('winston');
const expressWinston = require('express-winston');

const logsDirectory = path.join(__dirname, '..', 'logs');

if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory, { recursive: true });
}

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: path.join(logsDirectory, 'request.log'),
    }),
  ],
  format: winston.format.json(),
  meta: true,
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(logsDirectory, 'error.log'),
    }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
