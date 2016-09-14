//Modulos
var express = require('express'),
		consign = require('consign'),
		config  = require('./config');

const app = module.exports = express();

consign()
	.include('./config/db.js')
	.then('./config/middlewares.js')
	.into(app);


app.listen(config.port, function(){
	console.log('API Iniciada na porta', config.port);
});
