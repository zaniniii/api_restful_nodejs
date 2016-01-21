var db = require('../config/db_config.js');

//Modulo usuario
var User = require('../models/user');

//Listando os usuários
exports.list = function(callback){

	User.find({}, function(error, users){

		if(error){
			callback({error : 'Não foi possível retornar os usuários.'});
		}else{
			callback(users);
		}

	}).select("-password");
};

//Exibindo Usuário
exports.user = function(id, callback){

	User.findById(id, function(error, user){

		if(error){
			callback({error : 'Não foi possível retornar o usuário.'});
		}else{
			callback(user);
		}

	});
};

//Add Usuário
exports.save = function(user, callback){
	
	new User(user).save(function(error, user){

		if(error){
			
			callback(error);

		}else{

			callback(user);
		}	

	});

};

//Atualizar Usuário
exports.update = function(id, editUser, callback){

	User.findById(id ,function(error, user){

		//Verifico se encontrou algum usuario
		if(!user){
			callback({error : 'Usuário não encontrado'});
			return;
		}

		//Confiro qual campo realmente foi alterado
		if(editUser.name){
			user.name = editUser.name;
		}

		if(editUser.email){
			user.email = editUser.email;
		}

		if(editUser.password){
			user.password = editUser.password;
		}

		user.updated_at = new Date();

		user.save(function(error, user){
			if(error){
				callback({error : 'Não foi possível realizar as alterações do usuario.'});
			}else{
				callback(user);
			}
		});

	});

};

//Deletar Usuário
exports.delete = function(id, callback){

	User.findById(id, function(error, user){

		if(!user){
			callback({error : true, message : 'Usuário inexistente.'});
		}else{
			user.remove(function(error){
				if(!error){
					callback({response : 'Usuário excluído com sucesso.'});
				}
			});
		}

	});

};