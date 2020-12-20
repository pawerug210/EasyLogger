 /**
 * Configurations of logger.
 */
const winstonRotator = require('winston-daily-rotate-file');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;


var rotatingFileTransport = new transports.DailyRotateFile({
    filename: '%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d',
	dirname: '/home/pi/logs/'
  });

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${level}] [${label}] ${message}`;
});

const logger = createLogger({
  level: 'debug',
  format: combine(
    format.timestamp({
	format: 'YYYY-MM-DD HH:mm:ss'}),
    myFormat
  ),
  transports: [
    new transports.Console(),
    rotatingFileTransport
  ],
});

module.exports = {
	'logger': logger,
};