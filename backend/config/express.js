const express = require('express');
const helmet = require('helmet');
const server = express();
const path = require('path');
const logger = require('../utils/logger.js');

const router = require('../app/routes/clients');

const main_path = process.env.main_path || '';

server.main_path = main_path;

server.use(helmet());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(main_path + '/v1/clients', router);
server.use(main_path, express.static(path.join(__dirname, '../../frontend')) );

server.get(main_path, (req, res) => res.sendFile(path.join(__dirname + '../../frontend/index.html')) );

server.use((req, res, next) => {
	logger.error(`Solicitação para URL inexistente : ${req.originalUrl}`);
	res.status(404).json(`Solicitação para URL inexistente : ${req.originalUrl}`);
});

server.use((err, req, res, next) => {
	logger.error(err.message);
	res.status(err.status ? err.status : 500).json(err.message);
});

module.exports = server;