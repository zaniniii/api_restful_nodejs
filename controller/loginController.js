
//Configuração DB
var db = require('../config/db_config.js');

//Modulo usuario
var User = require('../models/user');

//Json Web Token
var jwt = require('jwt-simple');

//Moment
var moment = require('moment');

var segredo = 'za9/*-+.798585lczm798585';

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



				var expires = moment().add(7,'days').valueOf();
    			
    			var token = jwt.encode({
	      			iss: user._id,
	      			exp: expires
    			}, segredo);

    			var dadosLogado = {
    				user : user,
    				token : token,
    				token_expires : expires
    			}

				return callback(dadosLogado);

			});

		}

	});
};