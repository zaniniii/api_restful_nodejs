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

		return db;
}
