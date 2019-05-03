const db = require('./../../config/db/dbMysql.js')();

function ClientDAO(){};

ClientDAO.prototype.find = function(){

	let query =  `SELECT *
				FROM clients
  				ORDER BY id ASC`;

    return db.executeQuery(query);
};

ClientDAO.prototype.findById = function(id){

	let query = `SELECT *
				FROM clients
				WHERE id = ?`;

	let params = [id];

    return db.executeQuery(query, params, null, true);
};

ClientDAO.prototype.insert = function(object){

	let query = `INSERT INTO clients
					(name, CEP, CPF, date_sent, status)
				VALUES
					(?, ?, ?, ?, ?)`;

	let params = [object.name, object.CEP, object.CPF, object.date_sent, object.status];

    return db.executeQuery(query, params);
};

ClientDAO.prototype.update = function(object){

	let query = `UPDATE clients SET 
					name = ?,
					date_sent = ?,
					status = ?
				WHERE id = ?`;

	let params = [object.name, object.date_sent, object.status, object.id];

    return db.executeQuery(query, params);
};

ClientDAO.prototype.delete = function(id){

	let query = `DELETE FROM clients WHERE id = ?`;

	let params = [id];

    return db.executeQuery(query, params, 'affectedRows');
};

module.exports = new ClientDAO();