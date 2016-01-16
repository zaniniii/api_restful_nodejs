
//Configuração DD
var db = require('../config/db_config.js');

//Modulo usuario
var User = require('../models/user');

//Logar
exports.logar = function(email, password, callback){

	User.findOne({email}, function(error, user){

		if(!user){
			
			return callback({error : true,
						message : 'Usuário inexistente.'});

		}else{

			user.verifyPassword(password, function(err, isMatch){

				if(err){
					return callback(err);
				}

				if(!isMatch){
					return callback({error : true,
						message : 'Login inválido.'});
				}

				return callback(user);

			});

		}

	});
};