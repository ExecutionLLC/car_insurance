const winston = require('winston');

const LOGGERS = Object.create(null);

function getLogger(name) {
    if (!LOGGERS[name]) {
        LOGGERS[name] = new winston.Logger({
            transports: [
                new winston.transports.Console({
                    level: 'debug',
                    label: name,
                    handleException: true,
                    json: false,
                    colorize: true
                })
            ],
            exitOnError: false
        });
    }

    return LOGGERS[name];
}

module.exports = getLogger;
