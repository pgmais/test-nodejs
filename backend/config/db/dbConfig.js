function DbConfig() {
	
	this.mysql = {
		projeto: {
			host: 'localhost',
			database : 'projeto',
			user : 'root',
			password : '',
			//debug : true
		},
	};
}

module.exports = new DbConfig();