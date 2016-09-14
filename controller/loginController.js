
'use strict';
//Modulo usuario
var config = require('../config/config'),
    jwt = require('jwt-simple');

let User = require('../models/user');

//Gerar nova senha
 var generate_password = function(){
    var id = "";
    while (id.length < 5) {
        id += Math.floor(Math.random() * 100);
    }
    return id;
}

//Logar
exports.logar = function(email, password, device_id, callback){

	User.findOne({email}, function(error, user){

		if(!user){

			return callback({error:true, code: 400, msg : 'Usuário não cadastrado'});

		}else{

			user.verifyPassword(password, function(err, isMatch){

				if(err){
					return callback({error:true, code: 400, msg : err});
				}

				if(!isMatch){
					return callback({error:true, code: 400, msg : 'Login inválido.'});
				}

            var token = jwt.encode({
                  user_id: user._id,
                  user_profile: user.profile,
            }, config.jwtToken);

            user.token = token;

            return callback(user);

			});
		}

	})
};


//Remember password
exports.remember_password = function(email, callback){

	User.findOne({email}, function(error, user){

		if(!user){
			return callback({error:true, code: 400, msg:'Usuário não cadastrado.'});
		}else{

			var new_password = generate_password();
			user.password = new_password;
			user.updated_at = new Date();

			user.save(function(error, user){
				if(error){
					return callback({error:true, code: 500, msg : error});
				}else{
          return callback({success : true, msg : 'Em instantes, você receberá um email com sua nova senha.'});
        }
			});
		}
	});
};
