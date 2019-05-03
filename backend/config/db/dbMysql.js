const mysql = require('mysql');
const config = require('./dbConfig');

module.exports = function(){

	return { executeQuery : executeQuery };

	function executeQuery(query, parameters, returnType, singleResult){

		let params = parameters ? parameters : [];

		return new Promise((resolve, reject) => {

			const connection = mysql.createConnection(config.mysql.projeto);

			connection.connect();

			connection.query(query, params, function (error, results, fields) {

				let returned;

				connection.end();

				if(error){
					reject(error);
				}

				if(returnType == 'affectedRows'){
					returned = results.affectedRows;
				} else if(returnType == 'changedRows') {
					returned = results.changedRows;
				}else {
					returned = (singleResult) ? results[0] : results;
				}

				resolve(returned);
			});
		});
	}
};