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
    maxFiles: '14d'
  });


const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    format.timestamp({
	format: 'YYYY-MM-DD HH:mm:ss'}),
    myFormat
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new transports.Console(),
    rotatingFileTransport
  ],
});

module.exports = {
'successlog': logger,
  // // // 'errorlog': errorlogger
};