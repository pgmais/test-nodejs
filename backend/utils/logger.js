const winston = require('winston');
const fs = require('fs');

if(!fs.existsSync('backend/logs')){
	fs.mkdirSync('backend/logs');
}

const logger = winston.createLogger({
	format: winston.format.json(),
	transports: [
		new winston.transports.File({ filename: 'backend/logs/error.log', level: 'error' }),
	]
});

module.exports = logger;