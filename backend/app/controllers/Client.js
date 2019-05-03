const fs = require('fs');
const moment = require('moment');
const helperCEP = require('../helpers/cep');
const dao = require('../dao/ClientDAO');

function find(req, res, next){

	dao.find()
	.then(results => res.json(results))
	.catch(error => next(new Error(`Erro ao consultar Listagem de Clientes. Erro : ${error.message}`)) );
};

function findById(req, res, next){

	const id = req.params.id;

	dao.findById(id)
	.then(results => res.json(results))
	.catch(error => next(new Error(`Erro ao consultar Dados de Cliente de ID ${id}. Erro : ${error.message}`)) );
};

function findDataCEP(req, res, next){

	const cep = req.params.cep;

	helperCEP.getCep(cep)
	.then(result => res.json(result.body))
	.catch(error => next(new Error(`Erro ao consultar CEP ${cep}. Erro : ${error}`)));
};

function insert(req, res, next){

	let item = req.body;

	item.date_sent = moment().format('YYYY-MM-DD HH:mm:ss');
	item.status = 'uploaded';

	dao.insert(item)
	.then(result => res.json(result.insertId))
	.catch(error => next(new Error(`Erro ao Salvar Cliente. Erro : ${error.message}`)) );
};

function update(req, res, next){

	let item = req.body;

	item.date_sent = moment().format('YYYY-MM-DD HH:mm:ss');
	item.status = 'update_info';

	dao.update(item)
	.then(result => res.json(result.changedRows))
	.catch(error => next(new Error(`Erro ao Editar ID : ${item.id} de Cliente. Erro : ${error.message}`)) );
};

async function remove(req, res, next){

	const id = req.params.id; 

	try{

		let client = await dao.findById(id);

		if(!client){
			throw new Error(`ID ${id} não encontrado`);
		}

		let affecteds = await dao.delete(client.id);

		res.status(204);
		//res.json(affecteds);

	} catch(error) {

		next(new Error(`Erro ao Remover Cliente: ${error.message}`));
	}
};

function removeUpload(req, res, next){

	let filePath = req.file.path;

	console.log(req.file);

	fs.unlink(filePath, (error) => {

	    if (error) next(new Error(`Erro ao Remover Upload: ${error.message}`));

	    res.json('Upload Feito e Removido com sucesso.');
	}); 
};

module.exports = {
	find,
	findById,
	findDataCEP,
	insert,
	update,
	remove,
	removeUpload
};