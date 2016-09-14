'use strict';

var config = require('../config/config'),
		jwt = require('jwt-simple'),
		fs = require('fs');

let User = require('../models/user');

//Listando os usuários
exports.list = function(callback){

	User.find({}, function(error, users){

		if(error){
			callback({error: true, code : 400,  msg : 'Não foi possível retornar os usuários.'});
		}else{
			callback(users);
		}

	}).select("-password");
};


//Lista com Filtro
exports.listProfile = function(profile, callback){

	User.find({'profile' : profile}, function(error, users){

		if(error){
			callback({error: true, code : 400,  msg : 'Não foi possível retornar nenhum usuário.'});
		}else{
			callback(users);
		}

	}).select("name email avatar created_at");
};

//Exibindo Usuário
exports.user = function(id, callback){

	User.findById(id, function(err, user){
		if(!user){
				callback({error:true, code: 400, msg : 'Usuário não encontrado'});
			}else{
			return callback(user);
			}
	}).select("-password");
};

//Add Usuário
exports.save = function(user, callback){

	new User(user).save(function(err, user){

		if(err){

			if(err.code == 11000){
				callback({error:true, msg:'Este email já consta em nossos cadastros'});
				return;
			}
			callback({error:true, msg:err});
			return;

		}else{

			var token = jwt.encode({
      			user_id: user._id,
						user_profile: user.profile,
			}, config.jwtToken);

			var newUser = {
				_id : user._id,
				name : user.name,
				email : user.email,
				profile : user.profile,
				cell_phone : user.cell_phone,
				token : token
			}

			//Crio uma pasta para o usuário
				var dir = './public/upload/users/' + user._id;
				fs.mkdirSync(dir);

				// if(user.profile == 'Aluno'){
				//   sendEmailWelcome(user.name, user.email);
				// }

			callback(newUser);

		}

	});
};

//
// function sendEmailWelcome(name, email){
//   emailjs.send("zoho","welcome",{'name': name, 'email':email})
//   .then(function(response) {
//      console.log('Email de boas vindas enviado');
//   }, function(err) {
//       console.log('Email erro ao enviar o e-mail de boas vindas');
//      return false;
//   });
// }


//Add Lojista através do admin
exports.saveLojista = function(user, callback){
	var password = user.password;

	new User(user).save(function(err, user){

		if(err){

			if(err.code == 11000){
				callback({error:true, msg:'Este email já consta em nossos cadastros'});
				return;
			}
			callback({error:true, msg:err});
			return;

		}else{

				//Crio uma pasta para o usuário
				var dir = './public/upload/users/' + user._id;
				fs.mkdirSync(dir);

				 sendEmailWelcomeLojista(user.name, user.email, password);

				return callback({sucssess: true, msg : 'Lojista criado com sucesso.'});

		}

	});
};

function sendEmailWelcomeLojista(name, email, password){
	emailjs.send("zoho","welcome_lojista",{'name': name, 'email':email, 'new_password':password})
  .then(function(response) {
     console.log('Email de boas vindas ao lojista enviado');
  }, function(err) {
      console.log('Email erro ao enviar o e-mail de boas vindas');
     return false;
  });
}


//Atualizar Usuário
exports.update = function(editUser, callback){

	if(!editUser.id){
		callback({error:true, code: 422, msg : 'Favor informar o id do usuário.'});
		return;
	}

	User.findById(editUser.id ,function(error, user){

		//Verifico se encontrou algum usuario
		if(!user){
			callback({error:true, code: 400, msg : 'Usuário não encontrado'});
			return;
		}

		//Confiro qual campo realmente foi alterado
		// Dados Pessoais
		if(editUser.name){
			user.name = editUser.name;
		}

		if(editUser.email){
			user.email = editUser.email;
		}

		if(editUser.profile){
			user.profile = editUser.profile;
		}

		if(editUser.cell_phone){
			user.cell_phone = editUser.cell_phone;
		}

		if(editUser.avatar){
			user.avatar = editUser.avatar;
		}


		// Endereço
		if(editUser.address){
			user.address = editUser.address;
		}

		if(editUser.street){
			user.street = editUser.street;
		}

		if(editUser.number){
			user.number = editUser.number;
		}

		if(editUser.city){
			user.city = editUser.city;
		}

		if(editUser.postal_code){
			user.postal_code = editUser.postal_code;
		}

		if(editUser.country){
			user.country = editUser.country;
		}

		if(editUser.state){
			user.state = editUser.state;
		}

		if(editUser.district){
			user.district = editUser.district;
		}

		if(editUser.lat){
			user.lat = editUser.lat;
		}

		if(editUser.long){
			user.long = editUser.long;
		}

		user.updated_at = new Date();

		user.save(function(error, user){
			if(error){
				return callback({error:true, code: 500, msg : 'Não foi possível realizar as alterações do usuario.'});
			}else{
				return callback({sucssess: true, msg : 'Seus dados foram alterados.'});
				//return callback(user);
			}
		});

	});
};


//Deletar Usuário
exports.delete = function(id, callback){

	User.findById(id, function(error, user){

		if(!user){
			callback({error:true, code: 400, msg : 'Usuário não encontrado'});
		}else{
			user.remove(function(error){
				if(!error){
					callback({response : 'Usuário excluído com sucesso.'});
				}
			});
		}

	});
};

//Edit password
exports.edit_password = function(user_id, senha_atual, nova_senha, callback){

	User.findById(user_id, function(err, user){
		if(!user){
			return callback({error:true, code: 400, msg : 'Usuário não encontrado'});
		}else{

			user.verifyPassword(senha_atual, function(err, isMatch){

				if(err){
					return callback({error:true, code:400, msg:err});
				}

				if(!isMatch){
					return callback({error:true, code: 400, msg : 'Senha atual inválida.'});
				}else{

					user.password = nova_senha;
					user.updated_at = new Date();

					user.save(function(e, u){
						if(!e){
							return callback({sucssess: true, msg : 'Sua senha foi alterada com sucesso.'});
						}else{
							return callback(error);
						}
					});
				}
			});
		}
	});
};
