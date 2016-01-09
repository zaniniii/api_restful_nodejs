
//Configuração DD
var db = require('../config/db_config.js');

//Modulo usuario
var User = require('../models/user.js');

//Logar
exports.logar = function(email, password, callback){

	User.findOne({email, password}, function(error, user){

		if(error){
			
			callback({error : 'Não foi possível efetuar o login'});

		}else{

			if(user){
				
				callback({user});

			}else{

				callback({msg : 'Login inválido.'});

			}

		}

	}).select('-password');
};