'use strict';
var config = require('./config'),
 		mongoose = require('mongoose');

let db = null;

module.exports = function(){

		if(!db){
				mongoose = mongoose.connect(config.database.host);
				db =  mongoose.connection;
				mongoose.Promise = global.Promise;
		}

    //Conexão Realizada
    db.on('connected',function () {
      console.log('Conectou ao MongoDB');
    });

    //Caso tenha ocorrido algum erro
    db.on('error',function (err) {
      console.log('Erro de conexão MongoDb: ' + err.message);
    });

		return db;
}
